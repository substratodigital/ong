import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  validCnpj,
  calculateFoundationAge,
  visible,
  answered,
  validate,
  formatAnswerSummary,
  activeAnswers
} from '../src/domain.mjs';

const schema = JSON.parse(fs.readFileSync(new URL('../src/questionnaire.json', import.meta.url), 'utf8'));

test('Schema MVP-2 possui os 14 blocos temáticos e perguntas válidas', () => {
  assert.equal(schema.version, 'mvp-2');
  assert.equal(schema.blocks.length, 14);
  assert.ok(schema.questions.length >= 140);
  // Verifica que todos os blocos têm copys de celebração e no máximo ~17 perguntas
  for (let i = 0; i < schema.blocks.length; i++) {
    const b = schema.blocks[i];
    assert.ok(b.celebration?.title);
    assert.ok(b.celebration?.copy);
    const qs = schema.questions.filter(q => q.block === i);
    assert.ok(qs.length >= 5 && qs.length <= 18, `Bloco ${b.title} tem ${qs.length} perguntas`);
  }
});

test('Validação de CNPJ e cálculo automático de idade por data de fundação', () => {
  assert.equal(validCnpj('12.345.678/0001-95'), true);
  assert.equal(validCnpj('11.111.111/1111-11'), false);
  const age = calculateFoundationAge('04/2008');
  assert.ok(typeof age === 'number' && age >= 15);
  assert.equal(calculateFoundationAge('15/2008'), null);
});

test('Novos tipos de componentes (quintoandar, structural_condition, urgency_detail)', () => {
  const qaQ = schema.questions.find(q => q.type === 'quintoandar');
  assert.ok(qaQ);
  const qaVal = { 'Quartos / Dormitórios': 4, 'Banheiros': 3 };
  assert.equal(answered(qaQ, qaVal), true);
  assert.equal(validate(qaQ, qaVal), '');
  assert.match(formatAnswerSummary(qaQ, qaVal), /Quartos/);

  const scQ = schema.questions.find(q => q.type === 'structural_condition');
  assert.ok(scQ);
  const scVal = { ratings: { Banheiro: 'Médio', Cozinha: 'Bom' }, detail: 'Reforma hidráulica nos banheiros' };
  assert.equal(answered(scQ, scVal), true);
  assert.equal(validate(scQ, scVal), '');

  const udQ = schema.questions.find(q => q.type === 'urgency_detail');
  assert.ok(udQ);
  const udVal = { level: 5, detail: 'Precisamos de uma van de 15 lugares' };
  assert.equal(answered(udQ, udVal), true);
  assert.equal(validate(udQ, udVal), '');
  assert.match(formatAnswerSummary(udQ, udVal), /5 \(Urgente\)/);
});

test('Condicionais e limite de 300 caracteres nos campos abertos', () => {
  const q049 = schema.questions.find(q => q.id === 'q049');
  assert.equal(visible(q049, { q048: 'Não' }), false);
  assert.equal(visible(q049, { q048: 'Sim' }), true);

  const q060 = schema.questions.find(q => q.id === 'q060');
  assert.equal(validate(q060, 'x'.repeat(300)), '');
  assert.match(validate(q060, 'x'.repeat(301)), /300 caracteres/);
});
