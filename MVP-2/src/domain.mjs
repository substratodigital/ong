export function normalizeCnpj(value) {
  return String(value || '').toUpperCase().replace(/[.\-/\s]/g, '');
}

export function formatCnpjMask(value) {
  const raw = normalizeCnpj(value).slice(0, 14);
  if (raw.length <= 2) return raw;
  if (raw.length <= 5) return `${raw.slice(0, 2)}.${raw.slice(2)}`;
  if (raw.length <= 8) return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5)}`;
  if (raw.length <= 12) return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8)}`;
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12, 14)}`;
}

export function validCnpj(value) {
  const text = normalizeCnpj(value);
  if (!/^[A-Z0-9]{12}\d{2}$/.test(text) || /^(\d)\1{13}$/.test(text)) return false;
  const digit = (body, weights) => {
    const sum = [...body].reduce((s, c, i) => s + (c.charCodeAt(0) - 48) * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? '0' : String(11 - rest);
  };
  const first = digit(text.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return text.slice(-2) === first + digit(text.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
}

export function calculateFoundationAge(value) {
  if (!value) return null;
  const str = String(value).trim();
  const matchMonthYear = str.match(/^(\d{1,2})\/(\d{4})$/);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (matchMonthYear) {
    const month = Number(matchMonthYear[1]);
    const year = Number(matchMonthYear[2]);
    if (month < 1 || month > 12 || year < 1850 || year > currentYear) return null;
    let years = currentYear - year;
    if (currentMonth < month) years -= 1;
    return Math.max(0, years);
  }
  const matchYear = str.match(/^(\d{4})$/);
  if (matchYear) {
    const year = Number(matchYear[1]);
    if (year < 1850 || year > currentYear) return null;
    return Math.max(0, currentYear - year);
  }
  return null;
}

export function visible(q, answers) {
  return !q.condition || answers[q.condition.id] === q.condition.equals;
}

export function answered(q, value) {
  if (value === undefined || value === null) return false;
  if (q.type === 'rank') {
    return Array.isArray(value) && value.length === q.options.length && value.every(Boolean);
  }
  if (q.type === 'multi') {
    return Array.isArray(value) && value.length > 0;
  }
  if (q.type === 'quintoandar') {
    return typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0;
  }
  if (q.type === 'structural_condition') {
    if (typeof value !== 'object' || Array.isArray(value)) return false;
    const hasRatings = value.ratings && typeof value.ratings === 'object' && Object.keys(value.ratings).length > 0;
    const hasDetail = typeof value.detail === 'string' && value.detail.trim() !== '';
    return Boolean(hasRatings || hasDetail);
  }
  if (q.type === 'urgency_detail') {
    if (typeof value !== 'object' || Array.isArray(value)) return false;
    const hasLevel = typeof value.level === 'number' && value.level >= 0 && value.level <= 5;
    const hasDetail = typeof value.detail === 'string' && value.detail.trim() !== '';
    return Boolean(hasLevel || hasDetail);
  }
  return String(value).trim() !== '';
}

export function validate(q, value) {
  const maxLen = q.maxLength || (q.type === 'textarea' ? 300 : 200);
  if (!answered(q, value)) {
    if (q.type === 'rank' && Array.isArray(value) && value.some(Boolean)) {
      return 'Escolha as três posições ou deixe todas em branco.';
    }
    return q.required ? 'Preencha este campo para continuar.' : '';
  }
  if (q.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
    return 'Informe um e-mail no formato nome@entidade.org.br.';
  }
  if (q.type === 'cnpj' && !validCnpj(value)) {
    return 'Confira o CNPJ e seus dígitos verificadores.';
  }
  if (q.type === 'month_year' && calculateFoundationAge(value) === null) {
    return 'Informe o mês e ano no formato MM/AAAA (ex.: 04/2008) ou o ano (AAAA).';
  }
  if (q.type === 'cep') {
    const digits = String(value).replace(/\D/g, '');
    if (digits.length !== 8) return 'Informe um CEP válido com 8 dígitos (ex.: 01310-100).';
  }
  if (q.type === 'number') {
    const num = Number(value);
    if (!Number.isFinite(num) || num < 0 || num > 1000000 || (q.id !== 'q023' && !Number.isInteger(num))) {
      return 'Informe um número válido, não negativo' + (q.id === 'q023' ? '.' : ' e inteiro.');
    }
  }
  if (q.type === 'rank' && new Set(value).size !== q.options.length) {
    return 'Cada motivo precisa de uma posição diferente.';
  }
  if ((q.type === 'select' || q.type === 'options') && !q.options.includes(value)) {
    return 'Escolha uma opção válida.';
  }
  if (q.type === 'multi' && (!Array.isArray(value) || value.some(v => !q.options.includes(v)))) {
    return 'Revise as opções selecionadas.';
  }
  if (q.type === 'structural_condition' && value?.detail && String(value.detail).length > maxLen) {
    return `O texto complementar ultrapassa o limite de ${maxLen} caracteres.`;
  }
  if (q.type === 'urgency_detail' && value?.detail && String(value.detail).length > maxLen) {
    return `O texto complementar ultrapassa o limite de ${maxLen} caracteres.`;
  }
  if (typeof value === 'string' && value.length > maxLen) {
    return `O texto ultrapassa o limite de ${maxLen} caracteres.`;
  }
  return '';
}

export function formatAnswerSummary(q, value) {
  if (!answered(q, value)) return 'Não informado';
  if (q.type === 'rank' && Array.isArray(value)) {
    return q.options.map((o, k) => `${o}: ${value[k]}º lugar`).join(' · ');
  }
  if (q.type === 'multi' && Array.isArray(value)) {
    return value.join(', ');
  }
  if (q.type === 'quintoandar' && typeof value === 'object') {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' · ');
  }
  if (q.type === 'structural_condition' && typeof value === 'object') {
    const ratingsStr = value.ratings
      ? Object.entries(value.ratings).map(([k, v]) => `${k}: ${v}`).join(' · ')
      : '';
    const detailStr = value.detail ? `Detalhe: ${value.detail}` : '';
    return [ratingsStr, detailStr].filter(Boolean).join(' | ') || 'Preenchido';
  }
  if (q.type === 'urgency_detail' && typeof value === 'object') {
    const labels = ['0 (Não precisa)', '1 (Baixa)', '2 (Pouca)', '3 (Média)', '4 (Alta)', '5 (Urgente)'];
    const lvlStr = typeof value.level === 'number' ? `Prioridade: ${labels[value.level] || value.level}` : '';
    const detailStr = value.detail ? `Especificação: ${value.detail}` : '';
    return [lvlStr, detailStr].filter(Boolean).join(' — ') || 'Preenchido';
  }
  if (q.type === 'month_year') {
    const age = calculateFoundationAge(value);
    return age !== null ? `${value} (${age} ${age === 1 ? 'ano' : 'anos'} de atuação)` : String(value);
  }
  return String(value);
}

export function activeAnswers(questions, answers) {
  return Object.fromEntries(
    questions
      .filter(q => visible(q, answers) && answered(q, answers[q.id]))
      .map(q => [q.id, answers[q.id]])
  );
}
