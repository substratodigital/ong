import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Sprout,
  ShieldCheck,
  Users,
  ClipboardList,
  Plus,
  X,
  Clock3,
  Search,
  Mail,
  Fingerprint,
  Network,
  MapPin,
  Save,
  RotateCcw,
  Sun,
  Moon,
  ExternalLink,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import data from './questionnaire.json';
import {
  visible,
  answered,
  validate,
  activeAnswers,
  formatCnpjMask,
  calculateFoundationAge,
  formatAnswerSummary
} from './domain.mjs';
import './styles.css';
import './fonts.css';
import './survey.css';
import { Survey, SurveySubView } from './Survey';
import {
  computeBlockReportStats,
  exportUnitReportCsv,
  exportAllUnitsNetworkCsv,
  ParticipantOnboarding,
  DiagnosticRadarSection,
  DetailedIconReport
} from './ReportTools';

type Answers = Record<string, any>;
type Question = (typeof data.questions)[number];
type Status = 'Rascunho' | 'Enviada' | 'Em análise' | 'Ajustes solicitados' | 'Aprovada' | 'Não selecionada';
type Unit = {
  id: string;
  name: string;
  city: string;
  answers: Answers;
  status: Status;
  page: number;
  history: { text: string; date: string }[];
  snapshot?: Answers;
  feedback?: string;
};
type Member = { id: string; name: string; email: string; role: string };
type State = { version: 2; org: Answers; units: Unit[]; active: string; members: Member[] };
type Screen = 'intro' | 'home' | 'form' | 'review' | 'sent' | 'portal' | 'admin' | 'privacy' | 'journey' | 'access';

const KEY = 'netdobem-mvp-v2';
const shared = new Set(['entidade', 'natureza', 'fundacao_data', 'cnpj', 'gestor', 'funcao', 'email', 'telefone']);

const fresh = (): State => ({
  version: 2,
  org: {},
  units: [
    {
      id: 'casa-1',
      name: 'Minha primeira casa',
      city: 'São Paulo',
      answers: { uf: 'SP' },
      status: 'Rascunho',
      page: 0,
      history: []
    }
  ],
  active: 'casa-1',
  members: []
});

function restore(): State {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (
      p?.version === 2 &&
      Array.isArray(p.units) &&
      p.units.length &&
      p.units.every((u: Unit) => u.answers && Array.isArray(u.history) && Number.isInteger(u.page)) &&
      p.org &&
      Array.isArray(p.members)
    ) {
      return p;
    }
  } catch {}
  return fresh();
}

const now = () => new Date().toLocaleString('pt-BR');

const sampleAnswer = (q: Question): any => {
  if (q.id === 'entidade') return 'Associação Caminhos do Bem';
  if (q.id === 'casa') return 'Casa de Acolhimento Girassol';
  if (q.id === 'fundacao_data') return '04/2008';
  if (q.id === 'cnpj') return '12.345.678/0001-95';
  if (q.id === 'cep') return '01310-100';
  if (q.id === 'endereco') return 'Av. Paulista, 1000 - Bela Vista';
  if (q.id === 'cidade') return 'São Paulo';
  if (q.id === 'uf') return 'SP';
  if (q.id === 'gestor') return 'Marina Oliveira';
  if (q.id === 'funcao') return 'Coordenadora Técnica';
  if (q.id === 'email') return 'contato@caminhosdobem.org.br';
  if (q.id === 'telefone') return '(11) 98765-4321';
  if (q.type === 'rank') return ['1', '2', '3'];
  if (q.type === 'multi') return q.options.slice(0, 2);
  if (q.type === 'select' || q.type === 'options') return q.options[0];
  if (q.type === 'number') return '16';
  if (q.type === 'quintoandar') {
    return Object.fromEntries(q.options.map((opt, idx) => [opt, (idx % 4) + 2]));
  }
  if (q.type === 'structural_condition') {
    return {
      ratings: Object.fromEntries(q.options.map((opt, idx) => [opt, idx % 2 === 0 ? 'Bom' : 'Médio'])),
      detail: 'Reforma prioritária na parte hidráulica dos banheiros e pintura externa.'
    };
  }
  if (q.type === 'urgency_detail') {
    return {
      level: 4,
      detail: 'Necessidade prioritária identificada pela equipe técnica para qualificar o atendimento.'
    };
  }
  if (q.type === 'textarea') {
    return 'Acompanhamos as ações em reuniões periódicas de equipe buscando fortalecer o acolhimento e a rede.';
  }
  return 'Informação registrada';
};

const badgeClass = (s: Status) => (s === 'Aprovada' ? 'success' : s === 'Ajustes solicitados' ? 'warning' : 'neutral');

function placeholder(q: Question) {
  if (q.placeholder) return q.placeholder;
  if (q.type === 'number') return 'Ex.: 4';
  if (q.type === 'textarea') return 'Descreva em até 300 caracteres...';
  return 'Digite sua resposta';
}

function App() {
  const [state, setState] = useState<State>(restore);
  const [screen, setScreen] = useState<Screen>('intro');
  const [subView, setSubView] = useState<SurveySubView>('cards');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState('');
  const [storageError, setStorageError] = useState(false);
  const [saved, setSaved] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [filter, setFilter] = useState('Todas');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [newCity, setNewCity] = useState('');
  const [invite, setInvite] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');
  const [teamError, setTeamError] = useState('');
  const [ack, setAck] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [introAccepted, setIntroAccepted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem('netdobem-theme');
      if (s === 'light' || s === 'dark') return s;
    } catch {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('netdobem-theme', theme);
    } catch {}
  }, [theme]);

  useLayoutEffect(() => {
    document.body.dataset.screen = screen;
  }, [screen]);

  useEffect(() => {
    const checkHashOrQuery = () => {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === '#fundacao' || params.get('gestao') === 'fundacao' || params.get('admin') === '1') {
        setScreen('admin');
      }
    };
    checkHashOrQuery();
    window.addEventListener('hashchange', checkHashOrQuery);
    return () => window.removeEventListener('hashchange', checkHashOrQuery);
  }, []);

  const title = useRef<HTMLHeadingElement>(null);
  const previous = useRef('home');
  const unit = state.units.find(u => u.id === state.active) || state.units[0];
  const answers: Answers = { uf: 'SP', ...unit.answers, ...state.org };

  const pages = data.questions
    .filter(q => visible(q, answers))
    .map(q => ({ id: q.id, block: q.block, title: q.page, questionIds: [q.id] }));

  const pageIndex = Math.min(unit.page, Math.max(0, pages.length - 1));
  const page = pages[pageIndex] || pages[0];
  const current = data.questions.filter(q => page.questionIds.includes(q.id) && visible(q, answers));
  const activeQuestions = data.questions.filter(q => visible(q, answers));
  const completed = activeQuestions.filter(q => answered(q, answers[q.id]) && !validate(q, answers[q.id])).length;
  const percent = activeQuestions.length ? Math.round((completed / activeQuestions.length) * 100) : 0;
  const editable = ['Rascunho', 'Ajustes solicitados'].includes(unit.status);
  const reviewAnswers = !editable && unit.snapshot ? unit.snapshot : answers;
  const reviewQuestions = data.questions.filter(q => visible(q, reviewAnswers));
  const reportBlockStats = computeBlockReportStats(reviewQuestions, reviewAnswers);
  const doneBlocksCount = reportBlockStats.filter(b => b.status === 'completed').length;

  const handleExportCurrentUnitCsv = () => {
    exportUnitReportCsv({
      unitName: unit.name,
      unitCity: unit.city,
      unitStatus: unit.status,
      org: state.org,
      questions: reviewQuestions,
      answers: reviewAnswers
    });
    setToast('Relatório .CSV exportado com sucesso.');
  };

  const jumpToBlockForm = (blockIdx: number) => {
    const targetPage = pages.findIndex(p => p.block === blockIdx);
    if (targetPage >= 0) updateUnit(u => ({ ...u, page: targetPage }));
    go('form', 'form');
  };

  const go = (to: Screen, initialSubView?: SurveySubView) => {
    previous.current = screen;
    setScreen(to);
    if (initialSubView) setSubView(initialSubView);
    setErrors({});
    setAck(false);
    if (to === 'admin') {
      setSelected('');
      setReason('');
    }
    window.scrollTo({ top: 0 });
  };

  const changeUnit = (id: string) => {
    setState(s => ({ ...s, active: id }));
    setErrors({});
    setAck(false);
  };

  const updateUnit = (fn: (u: Unit) => Unit) =>
    setState(s => ({ ...s, units: s.units.map(u => (u.id === s.active ? fn(u) : u)) }));

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
        setStorageError(false);
        setSaved(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      } catch {
        setStorageError(true);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (screen !== 'form') title.current?.focus();
  }, [screen, pageIndex]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 5500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!resetDialog) return;
    const t = setTimeout(() => document.getElementById('cancel-reset')?.focus(), 0);
    return () => clearTimeout(t);
  }, [resetDialog]);

  function answer(q: Question, value: any) {
    setErrors(e => ({ ...e, [q.id]: '' }));
    setState(s =>
      shared.has(q.id)
        ? { ...s, org: { ...s.org, [q.id]: value } }
        : {
            ...s,
            units: s.units.map(u =>
              u.id === s.active
                ? {
                    ...u,
                    answers: { ...u.answers, [q.id]: value },
                    ...(q.id === 'casa' ? { name: String(value) || 'Casa sem nome' } : {}),
                    ...(q.id === 'cidade' ? { city: String(value) } : {})
                  }
                : u
            )
          }
    );
  }

  async function lookupCep(rawCep: string) {
    const digits = rawCep.replace(/\D/g, '');
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const info = await res.json();
      if (!info.erro) {
        const logradouroBairro = [info.logradouro, info.bairro].filter(Boolean).join(' - ');
        setState(s => ({
          ...s,
          units: s.units.map(u =>
            u.id === s.active
              ? {
                  ...u,
                  city: info.localidade || u.city,
                  answers: {
                    ...u.answers,
                    cep: `${digits.slice(0, 5)}-${digits.slice(5)}`,
                    ...(logradouroBairro ? { endereco: logradouroBairro } : {}),
                    ...(info.localidade ? { cidade: info.localidade } : {}),
                    ...(info.uf ? { uf: info.uf } : {})
                  }
                }
              : u
          )
        }));
      }
    } catch {
      // Silencioso caso offline
    } finally {
      setCepLoading(false);
    }
  }

  function validateAll(qs: Question[]) {
    const e = Object.fromEntries(qs.map(q => [q.id, validate(q, answers[q.id])]).filter(([, v]) => v));
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(() => document.getElementById(Object.keys(e)[0])?.focus(), 0);
      return false;
    }
    return true;
  }

  function next() {
    if (!validateAll(current)) return;
    const currentQ = current[0];
    const blockQs = activeQuestions.filter(q => q.block === currentQ.block);
    const isLastInBlock = blockQs[blockQs.length - 1]?.id === currentQ.id;

    if (isLastInBlock) {
      // Exibe a tela de Parabéns Personalizada da Etapa concluída!
      setSubView('celebration');
      window.scrollTo({ top: 0 });
      return;
    }

    if (pageIndex === pages.length - 1) {
      go('review');
      return;
    }
    updateUnit(u => ({ ...u, page: pageIndex + 1 }));
    window.scrollTo({ top: 0 });
  }

  function toggleDemoBlockComplete(blockIdx: number) {
    const bQs = data.questions.filter(q => q.block === blockIdx);
    const allDone = bQs.every(q => answered(q, answers[q.id]) && !validate(q, answers[q.id]));

    if (!allDone) {
      const newOrg = { ...state.org };
      const newUnitAnswers = { ...unit.answers };
      bQs.forEach(q => {
        const val = sampleAnswer(q);
        if (shared.has(q.id)) newOrg[q.id] = val;
        else newUnitAnswers[q.id] = val;
      });
      setState(s => ({
        ...s,
        org: newOrg,
        units: s.units.map(u =>
          u.id === s.active
            ? {
                ...u,
                name: String(newUnitAnswers.casa || u.name),
                city: String(newUnitAnswers.cidade || u.city),
                answers: newUnitAnswers
              }
            : u
        )
      }));
    } else {
      const newOrg = { ...state.org };
      const newUnitAnswers = { ...unit.answers };
      bQs.forEach(q => {
        if (shared.has(q.id)) delete newOrg[q.id];
        else delete newUnitAnswers[q.id];
      });
      setState(s => ({
        ...s,
        org: newOrg,
        units: s.units.map(u => (u.id === s.active ? { ...u, answers: newUnitAnswers } : u))
      }));
    }
  }

  function demo() {
    const org: Answers = {
      entidade: 'Instituto Horizonte — Demonstração',
      natureza: 'Associação privada',
      fundacao_data: '04/2008',
      cnpj: '12.345.678/0001-95',
      gestor: 'Marina Exemplo',
      funcao: 'Coordenadora Institucional',
      email: 'marina@institutohorizonte.org.br',
      telefone: '(11) 98888-7777'
    };
    const values = Object.fromEntries(
      data.questions.filter(q => !shared.has(q.id)).map(q => [q.id, sampleAnswer(q)])
    );
    setState({
      version: 2,
      org,
      active: 'casa-1',
      units: [
        {
          id: 'casa-1',
          name: 'Casa Girassol',
          city: 'Campinas',
          answers: { ...values, casa: 'Casa Girassol', cidade: 'Campinas', uf: 'SP' },
          status: 'Rascunho',
          page: 0,
          history: []
        },
        {
          id: 'casa-2',
          name: 'Casa Ipê',
          city: 'Sorocaba',
          answers: { ...values, casa: 'Casa Ipê', cidade: 'Sorocaba', uf: 'SP' },
          status: 'Em análise',
          page: 0,
          history: [
            { text: 'Inscrição de exemplo enviada', date: '27/10/2026' },
            { text: 'Análise iniciada pela Fundação', date: '28/10/2026' }
          ],
          snapshot: { ...values, ...org, casa: 'Casa Ipê', cidade: 'Sorocaba', uf: 'SP' }
        }
      ],
      members: []
    });
    setToast('Exemplo demonstrativo carregado com sucesso.');
  }

  function submit() {
    if (!validateAll(activeQuestions)) return;
    if (!ack) {
      setErrors({ ack: 'Confirme a revisão para concluir.' });
      document.getElementById('ack')?.focus();
      return;
    }
    updateUnit(u => ({
      ...u,
      status: 'Enviada',
      snapshot: activeAnswers(data.questions, answers),
      history: [
        ...u.history,
        {
          text: u.status === 'Ajustes solicitados' ? 'Inscrição reenviada' : 'Inscrição enviada',
          date: now()
        }
      ]
    }));
    go('sent');
  }

  function addUnit(e: React.FormEvent) {
    e.preventDefault();
    if (!newUnit.trim() || !newCity.trim()) return;
    const id = 'casa-' + Date.now();
    setState(s => ({
      ...s,
      active: id,
      units: [
        ...s.units,
        {
          id,
          name: newUnit.trim(),
          city: newCity.trim(),
          answers: { casa: newUnit.trim(), cidade: newCity.trim(), uf: 'SP' },
          page: 0,
          status: 'Rascunho',
          history: []
        }
      ]
    }));
    setNewUnit('');
    setNewCity('');
    setToast('Nova unidade adicionada à mantenedora.');
  }

  function addMember(e: React.FormEvent) {
    e.preventDefault();
    setTeamError('');
    if (state.members.length >= 3) {
      setTeamError('O limite é de três colaboradores por mantenedora.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite)) {
      setTeamError('Informe um e-mail válido.');
      return;
    }
    if (
      state.members.some(m => m.email.toLowerCase() === invite.trim().toLowerCase()) ||
      String(state.org.email).toLowerCase() === invite.trim().toLowerCase()
    ) {
      setTeamError('Este e-mail já faz parte da equipe.');
      return;
    }
    setState(s => ({
      ...s,
      members: [...s.members, { id: String(Date.now()), name: 'Colaborador convidado', email: invite.trim(), role: inviteRole }]
    }));
    setInvite('');
    setToast('Colaborador adicionado.');
  }

  function decision(id: string, status: Status) {
    if (!reason.trim() && status !== 'Em análise') {
      setToast('Escreva uma devolutiva antes de registrar a decisão.');
      document.getElementById('reason')?.focus();
      return;
    }
    setState(s => ({
      ...s,
      units: s.units.map(u =>
        u.id === id
          ? {
              ...u,
              status,
              feedback: reason.trim(),
              history: [...u.history, { text: status + (reason.trim() ? ' · ' + reason.trim() : ''), date: now() }]
            }
          : u
      )
    }));
    setReason('');
    setToast('Decisão registrada.');
  }

  // Renderizador de cada tipo de pergunta no MVP-2
  function field(q: Question) {
    const value = answers[q.id];
    const error = errors[q.id];
    const maxLen = q.maxLength || 300;

    return (
      <div className={'field ' + (error ? 'invalid' : '')} key={q.id}>
        <label id={q.id + '-label'} htmlFor={q.id}>
          <span>{q.label}</span>
        </label>
        {q.help && (
          <p id={q.id + '-help'} className="help">
            {q.help}
          </p>
        )}

        {/* TEXTO, EMAIL, CNPJ */}
        {['text', 'email', 'cnpj'].includes(q.type) && (
          <input
            id={q.id}
            type={q.type === 'email' ? 'email' : 'text'}
            inputMode={q.type === 'email' ? 'email' : q.type === 'cnpj' ? 'numeric' : 'text'}
            maxLength={200}
            autoComplete="off"
            placeholder={placeholder(q)}
            value={String(value ?? '')}
            aria-required={q.required}
            aria-invalid={!!error}
            aria-describedby={q.id + '-help ' + q.id + '-error'}
            onChange={e => {
              const raw = e.target.value;
              answer(q, q.type === 'cnpj' ? formatCnpjMask(raw) : raw);
            }}
          />
        )}

        {/* NÚMERO COM SETAS VERDES GRANDES (MELHOR NO MOBILE) */}
        {q.type === 'number' && (() => {
          const step = q.id === 'q023' ? 0.5 : 1;
          const current = Number(String(value ?? '').replace(',', '.')) || 0;
          const setNum = (n: number) => answer(q, String(Math.max(0, Math.min(1000000, Math.round(n * 10) / 10))));
          return (
            <div className="number-stepper">
              <input
                id={q.id}
                type="number"
                inputMode="decimal"
                min={0}
                max={1000000}
                step={step}
                autoComplete="off"
                placeholder={placeholder(q)}
                value={String(value ?? '')}
                aria-required={q.required}
                aria-invalid={!!error}
                aria-describedby={q.id + '-help ' + q.id + '-error'}
                onChange={e => answer(q, e.target.value)}
              />
              {q.unit && <span className="number-unit">{q.unit}</span>}
              <div className="stepper-buttons">
                <button type="button" aria-label="Aumentar" onClick={() => setNum(current + step)}>
                  <ChevronUp strokeWidth={3} />
                </button>
                <button
                  type="button"
                  aria-label="Diminuir"
                  disabled={current <= 0}
                  onClick={() => setNum(current - step)}
                >
                  <ChevronDown strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })()}

        {/* MÊS E ANO DE FUNDAÇÃO (MM/AAAA) COM CÁLCULO AUTOMÁTICO DE IDADE */}
        {q.type === 'month_year' && (
          <div>
            <input
              id={q.id}
              type="text"
              inputMode="numeric"
              maxLength={7}
              placeholder={placeholder(q)}
              value={String(value ?? '')}
              aria-describedby={q.id + '-help ' + q.id + '-error'}
              onChange={e => {
                let raw = e.target.value.replace(/[^\d/]/g, '');
                if (/^\d{3,}$/.test(raw) && !raw.includes('/')) {
                  const firstTwo = Number(raw.slice(0, 2));
                  if (firstTwo >= 1 && firstTwo <= 12) {
                    raw = `${raw.slice(0, 2)}/${raw.slice(2, 6)}`;
                  }
                }
                answer(q, raw);
              }}
            />
            {calculateFoundationAge(value) !== null && (
              <div className="computed-info-pill">
                <CheckCircle2 size={16} />
                <span>
                  Tempo calculado de existência: <strong>{calculateFoundationAge(value)} anos</strong>
                </span>
              </div>
            )}
          </div>
        )}

        {/* CEP COM BUSCA AUTOMÁTICA VIACEP */}
        {q.type === 'cep' && (
          <div className="cep-field-row">
            <input
              id={q.id}
              type="text"
              inputMode="numeric"
              maxLength={9}
              placeholder={placeholder(q)}
              value={String(value ?? '')}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                const formatted = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
                answer(q, formatted);
                if (digits.length === 8) {
                  lookupCep(digits);
                }
              }}
            />
            <button
              type="button"
              className="button secondary cep-btn"
              disabled={cepLoading}
              onClick={() => lookupCep(String(value ?? ''))}
            >
              {cepLoading ? 'Buscando…' : 'Buscar CEP'}
            </button>
          </div>
        )}

        {/* TEXTAREA COM LIMITE DE 300 CARACTERES */}
        {q.type === 'textarea' && (
          <>
            <textarea
              id={q.id}
              rows={3}
              placeholder={placeholder(q)}
              maxLength={maxLen}
              value={String(value ?? '')}
              aria-required={q.required}
              aria-invalid={!!error}
              aria-describedby={q.id + '-help ' + q.id + '-error'}
              onChange={e => answer(q, e.target.value)}
            />
            <span className="help char-counter">
              {String(value ?? '').length} / {maxLen} caracteres
            </span>
          </>
        )}

        {/* SELECT NATIVO (Ex.: UF com SP padrão) */}
        {q.type === 'select' && (
          <select
            id={q.id}
            value={String(value ?? (q.id === 'uf' ? 'SP' : ''))}
            aria-required={q.required}
            aria-invalid={!!error}
            aria-describedby={q.id + '-help ' + q.id + '-error'}
            onChange={e => answer(q, e.target.value)}
          >
            <option value="">Selecione uma opção</option>
            {q.options.map(o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        {/* OPTIONS: CARDS DE SELEÇÃO RÁPIDA COM GSAP */}
        {q.type === 'options' && (
          <div id={q.id} tabIndex={-1} className="options-stack" role="radiogroup" aria-labelledby={q.id + '-label'}>
            {q.options.map(opt => {
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={'option-btn ' + (isSelected ? 'selected' : '')}
                  onClick={e => {
                    answer(q, opt);
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                      gsap.fromTo(e.currentTarget, { scale: 0.97 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
                    }
                  }}
                >
                  <span>{opt}</span>
                  <CheckCircle2 size={19} className="option-check-icon" />
                </button>
              );
            })}
          </div>
        )}

        {/* MULTI: CHECKBOXES VISUAIS */}
        {q.type === 'multi' && (
          <div id={q.id} tabIndex={-1} className="choices" role="group" aria-labelledby={q.id + '-label'}>
            {q.options.map(o => {
              const arr = Array.isArray(value) ? value : [];
              const chosen = arr.includes(o);
              return (
                <label className={'choice ' + (chosen ? 'chosen' : '')} key={o}>
                  <input
                    type="checkbox"
                    checked={chosen}
                    onChange={e => answer(q, e.target.checked ? [...arr, o] : arr.filter(x => x !== o))}
                  />
                  <span>{o}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* RANKING (1º, 2º, 3º LUGAR) */}
        {q.type === 'rank' && (
          <div id={q.id} tabIndex={-1} role="group" aria-labelledby={q.id + '-label'}>
            {q.options.map((o, i) => (
              <label className="rank" key={o}>
                <span>{o}</span>
                <select
                  aria-label={'Posição de ' + o}
                  value={Array.isArray(value) ? value[i] || '' : ''}
                  onChange={e => {
                    const arr = Array.isArray(value) ? [...value] : ['', '', ''];
                    arr[i] = e.target.value;
                    answer(q, arr);
                  }}
                >
                  <option value="">Posição</option>
                  {[1, 2, 3].map(n => (
                    <option key={n} value={n}>
                      {n}º lugar
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {/* QUINTOANDAR COUNTER GRID (Cômodos, Faixas Etárias e Quadro de Equipe) */}
        {q.type === 'quintoandar' && (
          <div>
            <div id={q.id} tabIndex={-1} className="qa-grid" role="group" aria-labelledby={q.id + '-label'}>
              {q.options.map(item => {
                const currentObj: Record<string, number> =
                  value && typeof value === 'object' && !Array.isArray(value) ? value : {};
                const count = Number(currentObj[item] ?? 0);

                const updateCount = (nextVal: number, numEl?: HTMLElement | null) => {
                  const clamped = Math.max(0, Math.min(9999, nextVal));
                  answer(q, { ...currentObj, [item]: clamped });
                  if (numEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    gsap.fromTo(
                      numEl,
                      { scale: 1.32, color: '#216e43' },
                      { scale: 1, clearProps: 'color', duration: 0.28, ease: 'back.out(2)' }
                    );
                  }
                };

                return (
                  <div className={'qa-counter-card ' + (count > 0 ? 'has-value' : '')} key={item}>
                    <span className="qa-item-label">{item}</span>
                    <div className="counter-controls">
                      <button
                        type="button"
                        className="counter-btn"
                        aria-label={`Diminuir ${item}`}
                        onClick={e => {
                          const numEl = e.currentTarget.nextElementSibling as HTMLElement;
                          updateCount(count - 1, numEl);
                        }}
                      >
                        −
                      </button>
                      <strong className="counter-val">{count}</strong>
                      <button
                        type="button"
                        className="counter-btn"
                        aria-label={`Aumentar ${item}`}
                        onClick={e => {
                          const numEl = e.currentTarget.previousElementSibling as HTMLElement;
                          updateCount(count + 1, numEl);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumo automático de soma e ocupação para as perguntas de faixa etária / equipe */}
            {value && typeof value === 'object' && !Array.isArray(value) && (
              <div className="computed-info-pill" style={{ marginTop: 14 }}>
                <CheckCircle2 size={16} />
                <span>
                  Total somado nesta tela:{' '}
                  <strong>
                    {Object.values(value).reduce((acc: number, n: any) => acc + (Number(n) || 0), 0)}
                  </strong>
                  {q.id === 'q021_faixas' && Number(answers.q022) > 0 && (
                    <>
                      {' '}
                      · Taxa de ocupação atual:{' '}
                      <strong>
                        {Math.round(
                          (Object.values(value).reduce((acc: number, n: any) => acc + (Number(n) || 0), 0) /
                            Number(answers.q022)) *
                            100
                        )}
                        %
                      </strong>{' '}
                      (de {answers.q022} vagas)
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {/* STRUCTURAL CONDITION GRID (5 Ambientes em Bom / Médio / Péssimo + Detalhamento) */}
        {q.type === 'structural_condition' && (
          <div id={q.id} tabIndex={-1} className="structural-condition-box">
            <div className="structural-rows">
              {q.options.map(envName => {
                const currentVal =
                  value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : { ratings: {}, detail: '' };
                const selectedRating = currentVal.ratings?.[envName] || '';

                return (
                  <div className="structural-row" key={envName}>
                    <span className="structural-env-name">{envName}</span>
                    <div className="structural-pills">
                      {(['Bom', 'Médio', 'Péssimo'] as const).map(lvl => {
                        const active = selectedRating === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            className={`structural-pill ${lvl.toLowerCase()} ${active ? 'selected' : ''}`}
                            onClick={e => {
                              answer(q, {
                                ...currentVal,
                                ratings: { ...(currentVal.ratings || {}), [envName]: lvl }
                              });
                              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                                gsap.fromTo(
                                  e.currentTarget,
                                  { scale: 0.92 },
                                  { scale: 1, duration: 0.25, ease: 'back.out(2)' }
                                );
                              }
                            }}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 16 }}>
              <label htmlFor={q.id + '-detail'} className="sub-detail-label">
                Detalhe as reformas estruturais necessárias (até {maxLen} caracteres)
              </label>
              <textarea
                id={q.id + '-detail'}
                rows={3}
                maxLength={maxLen}
                placeholder={placeholder(q)}
                value={String(value?.detail ?? '')}
                onChange={e => {
                  const currentVal =
                    value && typeof value === 'object' && !Array.isArray(value)
                      ? value
                      : { ratings: {}, detail: '' };
                  answer(q, { ...currentVal, detail: e.target.value });
                }}
              />
              <span className="help char-counter">
                {String(value?.detail ?? '').length} / {maxLen} caracteres
              </span>
            </div>
          </div>
        )}

        {/* URGENCY SLIDER / SCALE (0 a 5) + CAMPO ABERTO DE ESPECIFICAÇÃO */}
        {q.type === 'urgency_detail' && (
          <div id={q.id} tabIndex={-1} className="urgency-detail-box">
            <div className="urgency-scale" role="radiogroup" aria-label="Nível de prioridade / urgência">
              {[
                { lvl: 0, text: '0 • Não precisa' },
                { lvl: 1, text: '1 • Baixa' },
                { lvl: 2, text: '2 • Pouca' },
                { lvl: 3, text: '3 • Média' },
                { lvl: 4, text: '4 • Alta' },
                { lvl: 5, text: '5 • Urgente' }
              ].map(({ lvl, text }) => {
                const currentVal =
                  value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : { level: undefined, detail: '' };
                const isSelected = currentVal.level === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`urgency-pill lvl-${lvl} ${isSelected ? 'selected' : ''}`}
                    onClick={e => {
                      answer(q, { ...currentVal, level: lvl });
                      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        gsap.fromTo(
                          e.currentTarget,
                          { scale: 0.9 },
                          { scale: 1, duration: 0.26, ease: 'back.out(2.2)' }
                        );
                      }
                    }}
                  >
                    {text}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 14 }}>
              <label htmlFor={q.id + '-detail'} className="sub-detail-label">
                Especifique o que a casa precisa neste item (até {maxLen} caracteres)
              </label>
              <textarea
                id={q.id + '-detail'}
                rows={3}
                maxLength={maxLen}
                placeholder={placeholder(q)}
                value={String(value?.detail ?? '')}
                onChange={e => {
                  const currentVal =
                    value && typeof value === 'object' && !Array.isArray(value)
                      ? value
                      : { level: undefined, detail: '' };
                  answer(q, { ...currentVal, detail: e.target.value });
                }}
              />
              <span className="help char-counter">
                {String(value?.detail ?? '').length} / {maxLen} caracteres
              </span>
            </div>
          </div>
        )}

        <span className="field-meta">{q.required ? '*Obrigatório' : 'Opcional'}</span>
        {error && (
          <p id={q.id + '-error'} className="error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  const unitSelect = (
    <label className="unit-selector">
      Casa em acompanhamento
      <select value={unit.id} onChange={e => changeUnit(e.target.value)}>
        {state.units.map(u => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </label>
  );

  const titleNode = (eyebrow: string, text: string, description?: string) => (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1 ref={title} tabIndex={-1}>
        {text}
      </h1>
      {description && <p>{description}</p>}
    </div>
  );

  return (
    <>
      <a className="skip" href="#main">
        Pular para o conteúdo
      </a>

      {screen !== 'intro' && (
        <header className="header">
          <button
            className="brand official-brand"
            aria-label="Fundação Net do Bem, início"
            onClick={() => go('intro')}
          >
            <img
              className="logo-light"
              src={`${import.meta.env.BASE_URL}brand/NET-DO-BEM-VERDE-HORIZONTAL.svg`}
              alt="Fundação Net do Bem"
            />
            <img
              className="logo-dark"
              src={`${import.meta.env.BASE_URL}brand/NET-DO-BEM-WHITE-HORIZONTAL.svg`}
              alt="Fundação Net do Bem"
            />
          </button>

          {screen === 'form' ? (
            <div id="survey-menu-slot" />
          ) : (
            <div className="portal-header-nav" role="navigation" aria-label="Navegação do participante">
              <div className="context-view-pills">
                <button
                  type="button"
                  className="context-pill-btn"
                  onClick={() => go('form', 'cards')}
                >
                  <LayoutGrid size={14} />
                  <span>Painel</span>
                </button>
                <button
                  type="button"
                  className={'context-pill-btn ' + (screen === 'portal' ? 'active' : '')}
                  onClick={() => go('portal')}
                >
                  <Building2 size={14} />
                  <span>Entidade</span>
                </button>
                <button
                  type="button"
                  className={'context-pill-btn ' + (screen === 'review' ? 'active' : '')}
                  onClick={() => go('review')}
                >
                  <FileSpreadsheet size={14} />
                  <span>Relatório</span>
                </button>
              </div>
            </div>
          )}

          <div className="header-tools">
            <button
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </button>
          </div>
        </header>
      )}

      <main id="main">
        {/* CAPA DE BOAS-VINDAS (INTRO) */}
        {screen === 'intro' && (
          <section className="survey-intro" aria-labelledby="intro-title">
            <div className="intro-content">
              <img
                className="intro-logo"
                src={`${import.meta.env.BASE_URL}brand/NET-DO-BEM-WHITE-HORIZONTAL.svg`}
                alt="Fundação Net do Bem"
              />
              <h1 id="intro-title" ref={title} tabIndex={-1}>
                Conhecer para
                <br />
                fortalecer o cuidado.
              </h1>
              <p className="intro-description">
                Um retrato cuidadoso de quem acolhe, protege e transforma vidas. Suas respostas ajudam a construir o
                diagnóstico nacional das casas de acolhimento e a direcionar apoios reais da nossa rede.
              </p>

              <div className="intro-details">
                <span>
                  <LayoutGrid aria-hidden="true" /> Etapas curtas, em média 10 questões
                </span>
                <span>
                  <Clock3 aria-hidden="true" /> Salvo automaticamente
                </span>
              </div>

              <label className="intro-accept">
                <input
                  type="checkbox"
                  checked={introAccepted}
                  onChange={e => setIntroAccepted(e.target.checked)}
                />
                <span>
                  Li a apresentação e aceito participar da pesquisa. Compartilharei apenas informações institucionais,
                  sem identificar crianças ou famílias.
                </span>
              </label>

              <div className="intro-actions">
                <button
                  className="button intro-start"
                  disabled={!introAccepted}
                  onClick={() => go(editable ? 'form' : 'portal', 'cards')}
                >
                  {completed ? 'Entrar no Painel' : 'Começar Pesquisa'}
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>

              <div className="intro-links-row">
                <a
                  href="https://www.netdobem.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="intro-privacy"
                >
                  Quem somos <ExternalLink size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
                <span aria-hidden="true" style={{ color: '#bed8c8' }}>•</span>
                <button type="button" className="intro-privacy" onClick={() => go('privacy')}>
                  Termo privacidade
                </button>
              </div>
            </div>
          </section>
        )}

        {screen === 'home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                {titleNode(
                  'REDE NET DO BEM',
                  'Quem acolhe também precisa de apoio.',
                  'Queremos conhecer a realidade da sua casa para construir uma rede que fortalece pessoas, gestão e cuidado.'
                )}
                <div className="actions">
                  <button className="button primary" onClick={() => go('form', 'cards')}>
                    {completed ? 'Continuar minha pesquisa' : 'Ver Painel de Etapas'}
                    <ArrowRight />
                  </button>
                  <button className="button secondary" onClick={demo}>
                    Carregar exemplo preenchido
                  </button>
                </div>
                <p className="hero-note">
                  <Save /> Preencha no seu ritmo pelos cards de etapas. Retome quando precisar.
                </p>
              </div>
              <div className="network-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <span className="art-tag">Cuidado que conecta.</span>
                <div className="node node-main">
                  <HeartHandshake />
                  <span>
                    Juntos,
                    <br />
                    vamos além.
                  </span>
                </div>
                <div className="node node-house">
                  <Building2 />
                </div>
                <div className="node node-people">
                  <Users />
                </div>
                <div className="node node-sprout">
                  <Sprout />
                </div>
                <span className="art-bottom">Uma rede. Muitas possibilidades.</span>
              </div>
            </section>
          </>
        )}

        {screen === 'access' && (
          <section className="narrow">
            {titleNode(
              'SEU PRIMEIRO PASSO',
              'Um acesso para toda a jornada.',
              'O gestor representa a mantenedora e pode acompanhar várias casas vinculadas ao mesmo CNPJ.'
            )}
            <div className="panel">
              <Mail className="feature-icon" />
              <h2>Acesso da Instituição</h2>
              <p>Suas respostas ficam salvas automaticamente para que você possa pausar e retomar com segurança.</p>
              <button className="button primary full" onClick={() => go(editable ? 'form' : 'portal', 'cards')}>
                Ir para o Painel de Etapas <ArrowRight />
              </button>
              <div className="future">
                <Fingerprint />
                <p>Login unificado por ID institucional e CNPJ para retomar em qualquer sessão.</p>
              </div>
              <button
                className="text-button"
                onClick={() => {
                  demo();
                  go('form', 'cards');
                }}
              >
                Carregar dados de exemplo para testar
              </button>
            </div>
          </section>
        )}

        {/* TELA PRINCIPAL DA PESQUISA (CARDS HUB + FORMULÁRIO + PARABÉNS) */}
        {screen === 'form' && (
          <Survey
            question={current[0]}
            questions={activeQuestions}
            answers={answers}
            field={field(current[0])}
            percent={percent}
            saved={saved}
            storageError={storageError}
            editable={editable}
            userName={String(state.org.gestor || 'Participante da pesquisa')}
            userRole={String(state.org.funcao || 'Acesso Participante')}
            userEmail={String(state.org.email || '')}
            orgName={String(state.org.entidade || 'Mantenedora vinculada')}
            unitName={unit.name}
            unitSelect={unitSelect}
            subView={subView}
            onChangeSubView={setSubView}
            onBlock={i => {
              const targetPage = pages.findIndex(p => p.block === i);
              if (targetPage >= 0) {
                updateUnit(u => ({ ...u, page: targetPage }));
              }
              setErrors({});
            }}
            onToggleDemoBlockComplete={toggleDemoBlockComplete}
            onNext={next}
            onBack={() => {
              setErrors({});
              if (pageIndex > 0) {
                updateUnit(u => ({ ...u, page: pageIndex - 1 }));
              } else {
                setSubView('cards');
              }
            }}
            onReview={() => go('review')}
            onExit={() => go('portal')}
            onOpenAdmin={() => go('admin')}
            last={pageIndex === pages.length - 1}
            first={pageIndex === 0}
          />
        )}

        {/* TELA DE RELATÓRIO E REVISÃO GERAL DOS 14 BLOCOS */}
        {screen === 'review' && (
          <section className="content portal-report-page">
            {titleNode(
              'RELATÓRIO DO DIAGNÓSTICO · REVISÃO E EXPORTAÇÃO',
              'Sua história, com clareza.',
              'Acompanhe o gráfico de radar, consulte o relatório detalhado com ícones por etapa, exporte em .CSV ou envie para a Fundação Net do Bem.'
            )}

            <div className="review-summary">
              <div className="review-summary-left">
                <div className="avatar">
                  <Building2 />
                </div>
                <div>
                  <span className={'badge ' + badgeClass(unit.status)}>{unit.status}</span>
                  <strong>{unit.name}</strong>
                  <p>
                    {completed} de {activeQuestions.length} questões preenchidas ({percent}%) • {doneBlocksCount} de 14 etapas concluídas
                  </p>
                </div>
              </div>
              <div className="review-summary-actions">
                <button type="button" className="button secondary compact-action-btn" onClick={() => go('form', 'cards')}>
                  <LayoutGrid size={17} /> Painel
                </button>
                <button type="button" className="button secondary compact-action-btn" onClick={() => go('portal')}>
                  <Building2 size={17} /> Minha Entidade
                </button>
                <button type="button" className="button primary compact-action-btn" onClick={handleExportCurrentUnitCsv}>
                  <Download size={17} /> Exportar .CSV
                </button>
              </div>
            </div>

            <DiagnosticRadarSection
              blockStats={reportBlockStats}
              onSelectBlock={jumpToBlockForm}
              onExportCsv={handleExportCurrentUnitCsv}
            />

            <DetailedIconReport
              blockStats={reportBlockStats}
              onEditBlock={jumpToBlockForm}
              onExportCsv={handleExportCurrentUnitCsv}
            />

            {Object.keys(errors).length > 0 && (
              <p className="error" role="alert">
                Há campos obrigatórios ou respostas que precisam de revisão. Clique em "Editar etapa" no bloco correspondente.
              </p>
            )}

            <div className="panel submit-confirm-panel">
              <span className="eyebrow">ENVIO OFICIAL PARA A FUNDAÇÃO NET DO BEM</span>
              <h2>Concluir e enviar diagnóstico desta unidade</h2>
              <label className="checkbox-label">
                <input id="ack" type="checkbox" checked={ack} onChange={e => setAck(e.target.checked)} />
                <span>
                  Revisei as informações institucionais da unidade <strong>{unit.name}</strong> e confirmo o envio para a Fundação Net do Bem.
                </span>
              </label>
              {errors.ack && <p className="error">{errors.ack}</p>}
              <div className="actions">
                <button className="button secondary" onClick={() => go('form', 'cards')}>
                  <ArrowLeft /> Voltar ao Painel
                </button>
                <button className="button secondary" type="button" onClick={handleExportCurrentUnitCsv}>
                  <Download size={18} /> Baixar Cópia em .CSV
                </button>
                <button className="button primary" disabled={!editable} onClick={submit}>
                  Concluir e Enviar Diagnóstico <ArrowRight />
                </button>
              </div>
            </div>
          </section>
        )}

        {screen === 'sent' && (
          <section className="narrow centered">
            <div className="success-symbol">
              <CheckCircle2 />
            </div>
            {titleNode(
              'DIAGNÓSTICO CONCLUÍDO',
              'Muito obrigado por fazer parte da Rede Net do Bem!',
              'Suas respostas foram registradas e ajudarão a construir o E-book diagnóstico nacional e a direcionar apoios para as instituições de acolhimento.'
            )}
            <div className="panel">
              <span className="eyebrow">PROTOCOLO DA UNIDADE</span>
              <h2>PESQUISA · {unit.id.toUpperCase()}</h2>
              <p>Você pode acompanhar as atualizações, exportar seu relatório em .CSV e gerenciar outras unidades no ambiente da entidade.</p>
            </div>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <button className="button secondary" onClick={handleExportCurrentUnitCsv}>
                <Download size={18} /> Exportar Relatório (.CSV)
              </button>
              <button className="button primary" onClick={() => go('portal')}>
                Ir para Minha Entidade <ArrowRight />
              </button>
            </div>
          </section>
        )}

        {screen === 'portal' && (
          <section className="content portal-report-page">
            {titleNode(
              'AMBIENTE DA ENTIDADE · ÁREA DO PARTICIPANTE E GESTOR',
              'Um lugar para cuidar do próximo passo.',
              String(state.org.entidade || 'Acompanhe o onboarding, o gráfico de radar e o relatório das casas vinculadas à sua mantenedora.')
            )}

            {/* PASSO A PASSO DE ONBOARDING DO PARTICIPANTE */}
            <ParticipantOnboarding
              hasOrgIdentity={Boolean(state.org.cnpj || state.org.entidade)}
              percent={percent}
              doneBlocksCount={doneBlocksCount}
              status={unit.status}
              onOpenPanel={() => go('form', 'cards')}
              onOpenReport={() => go('review')}
              onExportCsv={handleExportCurrentUnitCsv}
            />

            {/* CARD DE CONTEXTO DA CASA ATIVA + DADOS DO GESTOR */}
            <div className="dashboard-grid portal-hero-grid">
              <article className="panel accent-panel portal-unit-card">
                <div className="portal-unit-top">
                  <div className="profile" style={{ margin: 0 }}>
                    <div className="avatar">
                      <Building2 />
                    </div>
                    <div>
                      <span className={'badge ' + badgeClass(unit.status)}>{unit.status}</span>
                      <h2 style={{ marginTop: 6 }}>{unit.name}</h2>
                      <p>
                        <MapPin size={17} /> {unit.city || 'Município não informado'} · {answers.uf || 'SP'}
                      </p>
                    </div>
                  </div>
                  <div className="portal-unit-selector-wrap">{unitSelect}</div>
                </div>

                <div className="portal-progress-box">
                  <div className="card-progress-meta">
                    <span>
                      Progresso da pesquisa: <strong>{doneBlocksCount} de 14 etapas</strong> ({completed}/{activeQuestions.length} questões)
                    </span>
                    <strong className="card-pct-number">{percent}%</strong>
                  </div>
                  <div className="card-progress-bar" style={{ height: 9 }}>
                    <div className="card-progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <p className="portal-status-desc">
                  {unit.status === 'Ajustes solicitados'
                    ? unit.feedback
                    : unit.status === 'Aprovada'
                    ? 'Diagnóstico aprovado! Consulte abaixo o gráfico de radar e exporte seu relatório em .CSV.'
                    : editable
                    ? 'Acesse o Painel para responder as 14 etapas no seu ritmo ou exporte o relatório parcial em .CSV.'
                    : 'Diagnóstico enviado para análise da Fundação Net do Bem.'}
                </p>

                <div className="portal-action-buttons">
                  <button className="button primary" onClick={() => go(editable ? 'form' : 'review', 'cards')}>
                    <LayoutGrid size={18} />
                    <span>{editable ? 'Ir para o Painel' : 'Ver Respostas'}</span>
                    <ArrowRight size={17} />
                  </button>
                  <button className="button secondary" onClick={() => go('review')}>
                    <FileSpreadsheet size={18} />
                    <span>Relatório Completo</span>
                  </button>
                  <button className="button secondary" onClick={handleExportCurrentUnitCsv}>
                    <Download size={18} />
                    <span>Exportar .CSV</span>
                  </button>
                  <button className="button secondary" onClick={demo}>
                    <span>Carregar Exemplo</span>
                  </button>
                </div>
              </article>

              <article className="panel portal-user-card">
                <span className="eyebrow">DADOS DO GESTOR / PARTICIPANTE</span>
                <div className="profile">
                  <div className="avatar soft">
                    <Users />
                  </div>
                  <div>
                    <h2>{String(state.org.gestor || 'Responsável pela pesquisa')}</h2>
                    <p>{String(state.org.funcao || 'Função na instituição')}</p>
                  </div>
                </div>
                <div className="user-contact-meta">
                  <div>
                    <small>Mantenedora / CNPJ</small>
                    <strong>
                      {String(state.org.entidade || 'Não informada')}
                      {state.org.cnpj ? ` · ${state.org.cnpj}` : ''}
                    </strong>
                  </div>
                  <div>
                    <small>E-mail e Telefone</small>
                    <strong>
                      {String(state.org.email || 'E-mail não informado')}
                      {state.org.telefone ? ` · ${state.org.telefone}` : ''}
                    </strong>
                  </div>
                </div>
                <div className="portal-user-footer">
                  <span className="badge">Governança: 1 Gestor + até 3 Colaboradores</span>
                  <button type="button" className="text-button" onClick={() => jumpToBlockForm(0)}>
                    Editar dados cadastrais →
                  </button>
                </div>
              </article>
            </div>

            {/* GRÁFICO DE RADAR + MAPA DE EIXOS E ÍCONES */}
            <DiagnosticRadarSection
              blockStats={reportBlockStats}
              onSelectBlock={jumpToBlockForm}
              onExportCsv={handleExportCurrentUnitCsv}
            />

            {/* RELATÓRIO DETALHADO COM ÍCONES DAS 14 ETAPAS */}
            <DetailedIconReport
              blockStats={reportBlockStats}
              onEditBlock={jumpToBlockForm}
              onExportCsv={handleExportCurrentUnitCsv}
            />

            <section className="panel">
              <div className="section-head">
                <div>
                  <span className="eyebrow">UM CNPJ, VÁRIAS CASAS</span>
                  <h2>Casas vinculadas à mantenedora</h2>
                </div>
                <span className="badge">
                  {state.units.length} {state.units.length === 1 ? 'casa cadastrada' : 'casas cadastradas'}
                </span>
              </div>
              <div className="unit-cards">
                {state.units.map(u => {
                  const uMerged: Answers = { uf: 'SP', ...u.answers, ...state.org };
                  const uQs = data.questions.filter(q => visible(q, uMerged));
                  const uDone = uQs.filter(q => answered(q, uMerged[q.id]) && !validate(q, uMerged[q.id])).length;
                  const uPct = uQs.length ? Math.round((uDone / uQs.length) * 100) : 0;
                  return (
                    <button
                      key={u.id}
                      className={'unit-card ' + (u.id === unit.id ? 'selected' : '')}
                      onClick={() => changeUnit(u.id)}
                    >
                      <div className="unit-card-head">
                        <Building2 />
                        <span className={'badge ' + badgeClass(u.status)}>{u.status}</span>
                      </div>
                      <strong>{u.name}</strong>
                      <span>{u.city || 'Sem município'}</span>
                      <div style={{ width: '100%', marginTop: 6 }}>
                        <div className="card-progress-meta">
                          <span>Preenchimento</span>
                          <strong>{uPct}%</strong>
                        </div>
                        <div className="card-progress-bar">
                          <div className="card-progress-fill" style={{ width: `${uPct}%` }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <form className="inline-form" onSubmit={addUnit}>
                <label>
                  Nome da nova casa
                  <input required maxLength={100} value={newUnit} onChange={e => setNewUnit(e.target.value)} placeholder="Ex.: Casa Lar Esperança II" />
                </label>
                <label>
                  Município
                  <input required maxLength={100} value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="Ex.: Campinas" />
                </label>
                <button className="button secondary">
                  <Plus /> Adicionar casa
                </button>
              </form>
            </section>

            <section className="panel">
              <div className="section-head">
                <div>
                  <span className="eyebrow">ACESSOS INDIVIDUAIS DA ENTIDADE</span>
                  <h2>Equipe colaboradora no preenchimento</h2>
                </div>
                <span className="badge">{state.members.length} de 3 colaboradores</span>
              </div>
              {state.members.map(m => (
                <div className="member" key={m.id}>
                  <div>
                    <strong>{m.email}</strong>
                    <p>{m.role} · convite ativo nesta mantenedora</p>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => setState(s => ({ ...s, members: s.members.filter(x => x.id !== m.id) }))}
                  >
                    Revogar <X size={18} />
                  </button>
                </div>
              ))}
              <form className="inline-form" onSubmit={addMember}>
                <label>
                  E-mail do colaborador
                  <input
                    type="email"
                    required
                    value={invite}
                    onChange={e => setInvite(e.target.value)}
                    placeholder="colaborador@entidade.org.br"
                  />
                </label>
                <label>
                  Permissão
                  <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
                    <option>Editor</option>
                    <option>Leitor</option>
                  </select>
                </label>
                <button className="button secondary" disabled={state.members.length >= 3}>
                  <Plus /> Convidar colaborador
                </button>
              </form>
              {teamError && (
                <p className="error" role="alert">
                  {teamError}
                </p>
              )}
            </section>
          </section>
        )}

        {/* ÁREA RESTRITA DE GOVERNANÇA NÍVEL 2: GESTORES FUNDAÇÃO NET DO BEM (OCULTA DO MENU DO PARTICIPANTE) */}
        {screen === 'admin' && (
          <section className="content portal-report-page">
            <div className="admin-restricted-banner">
              <div>
                <span className="gov-badge">GOVERNANÇA NÍVEL 2 · ACESSO RESTRITO FUNDAÇÃO NET DO BEM</span>
                <h1>Painel de Gestão de Usuários, Pesquisas e Relatórios</h1>
                <p>Base consolidada de participantes cadastrados, percentual de preenchimento por unidade e exportação geral em .CSV.</p>
              </div>
              <div className="radar-head-actions">
                <button
                  type="button"
                  className="button primary compact-action-btn"
                  onClick={() => {
                    exportAllUnitsNetworkCsv({
                      org: state.org,
                      units: state.units,
                      allQuestions: data.questions
                    });
                    setToast('Base consolidada da rede exportada em .CSV.');
                  }}
                >
                  <Download size={17} /> Exportar Base Geral (.CSV)
                </button>
                <button type="button" className="button secondary compact-action-btn" onClick={() => go('portal')}>
                  Voltar à Visão Participante
                </button>
              </div>
            </div>

            <div className="stats">
              {[
                ['Casas cadastradas', state.units.length],
                ['Média preenchida', `${percent}%`],
                ['Para analisar', state.units.filter(u => ['Enviada', 'Em análise'].includes(u.status)).length],
                ['Aprovadas', state.units.filter(u => u.status === 'Aprovada').length]
              ].map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>

            <div className="panel">
              <div className="section-head">
                <div>
                  <span className="eyebrow">BASE DE USUÁRIOS E ENTIDADES CADASTRADAS</span>
                  <h2>Monitoramento de Preenchimento e Relatórios</h2>
                </div>
                <span className="badge">{state.units.length} unidades monitoradas</span>
              </div>
              <div className="filters">
                <label>
                  <span>Buscar casa, gestor ou município</span>
                  <div className="search-input">
                    <Search />
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Nome da casa, gestor ou município"
                    />
                  </div>
                </label>
                <label>
                  Filtrar por status
                  <select value={filter} onChange={e => setFilter(e.target.value)}>
                    {['Todas', 'Rascunho', 'Enviada', 'Em análise', 'Ajustes solicitados', 'Aprovada', 'Não selecionada'].map(
                      s => (
                        <option key={s}>{s}</option>
                      )
                    )}
                  </select>
                </label>
              </div>

              <div className="queue">
                {state.units
                  .filter(
                    u =>
                      (filter === 'Todas' || u.status === filter) &&
                      (u.name + ' ' + u.city + ' ' + String(state.org.gestor || '')).toLowerCase().includes(search.toLowerCase())
                  )
                  .map(u => {
                    const uMerged: Answers = { uf: 'SP', ...u.answers, ...(u.snapshot || {}), ...state.org };
                    const uQs = data.questions.filter(q => visible(q, uMerged));
                    const uBlockStats = computeBlockReportStats(uQs, uMerged);
                    const uAns = uBlockStats.reduce((acc, s) => acc + s.answeredCount, 0);
                    const uTot = uBlockStats.reduce((acc, s) => acc + s.totalCount, 0);
                    const uPct = uTot > 0 ? Math.round((uAns / uTot) * 100) : 0;
                    const uDoneBlocks = uBlockStats.filter(s => s.status === 'completed').length;

                    return (
                      <article className="queue-row admin-unit-row" key={u.id}>
                        <div className="queue-name">
                          <div className="avatar" style={{ width: 48, height: 48, borderRadius: 12 }}>
                            <Building2 size={22} />
                          </div>
                          <div>
                            <h3>{u.name}</h3>
                            <p>
                              {u.city || 'Município não informado'} · Gestor:{' '}
                              <strong>{String(state.org.gestor || 'Não informado')}</strong> (
                              {String(state.org.email || 'sem e-mail')})
                            </p>
                          </div>
                        </div>

                        <div className="admin-progress-cell">
                          <div className="card-progress-meta">
                            <span>{uDoneBlocks}/14 etapas</span>
                            <strong>{uPct}% preenchido</strong>
                          </div>
                          <div className="card-progress-bar">
                            <div className="card-progress-fill" style={{ width: `${uPct}%` }} />
                          </div>
                        </div>

                        <span className={'badge ' + badgeClass(u.status)}>{u.status}</span>

                        <div className="admin-row-actions">
                          <button
                            type="button"
                            className="button secondary compact-action-btn"
                            onClick={() =>
                              exportUnitReportCsv({
                                unitName: u.name,
                                unitCity: u.city,
                                unitStatus: u.status,
                                org: state.org,
                                questions: uQs,
                                answers: uMerged
                              })
                            }
                          >
                            <Download size={15} /> .CSV
                          </button>
                          <button
                            type="button"
                            className="button secondary compact-action-btn"
                            onClick={() => {
                              setSelected(selected === u.id ? '' : u.id);
                              setReason('');
                            }}
                          >
                            {selected === u.id ? 'Fechar Relatório' : 'Ver Relatório'}
                          </button>
                        </div>

                        {selected === u.id && (
                          <div className="analysis-detail">
                            <DiagnosticRadarSection
                              blockStats={uBlockStats}
                              onSelectBlock={idx => {
                                changeUnit(u.id);
                                jumpToBlockForm(idx);
                              }}
                              onExportCsv={() =>
                                exportUnitReportCsv({
                                  unitName: u.name,
                                  unitCity: u.city,
                                  unitStatus: u.status,
                                  org: state.org,
                                  questions: uQs,
                                  answers: uMerged
                                })
                              }
                            />

                            <DetailedIconReport
                              blockStats={uBlockStats}
                              onEditBlock={idx => {
                                changeUnit(u.id);
                                jumpToBlockForm(idx);
                              }}
                              onExportCsv={() =>
                                exportUnitReportCsv({
                                  unitName: u.name,
                                  unitCity: u.city,
                                  unitStatus: u.status,
                                  org: state.org,
                                  questions: uQs,
                                  answers: uMerged
                                })
                              }
                            />

                            {['Enviada', 'Em análise'].includes(u.status) && (
                              <div className="panel" style={{ marginTop: 18 }}>
                                <label htmlFor="reason">
                                  Parecer / Devolutiva da Fundação para a Entidade
                                  <textarea
                                    id="reason"
                                    rows={3}
                                    maxLength={300}
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    placeholder="Explique a decisão e o próximo passo."
                                  />
                                </label>
                                <div className="actions">
                                  {u.status === 'Enviada' && (
                                    <button className="button secondary" onClick={() => decision(u.id, 'Em análise')}>
                                      Iniciar análise
                                    </button>
                                  )}
                                  <button
                                    className="button secondary"
                                    onClick={() => decision(u.id, 'Ajustes solicitados')}
                                  >
                                    Solicitar ajustes
                                  </button>
                                  <button className="button primary" onClick={() => decision(u.id, 'Aprovada')}>
                                    Aprovar casa
                                  </button>
                                  <button className="text-button" onClick={() => decision(u.id, 'Não selecionada')}>
                                    Não selecionar
                                  </button>
                                </div>
                              </div>
                            )}
                            {u.feedback && <p style={{ marginTop: 12 }}>Última devolutiva: {u.feedback}</p>}
                          </div>
                        )}
                      </article>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {screen === 'privacy' && (
          <section className="narrow">
            {titleNode(
              'TERMO DE PRIVACIDADE E CUIDADO COM AS INFORMAÇÕES',
              'Conhecer a instituição. Preservar as pessoas.',
              'Compromisso da Fundação Net do Bem com a proteção de dados e o Estatuto da Criança e do Adolescente (ECA).'
            )}
            <div className="panel prose">
              <h2>1. Dados exclusivamente institucionais</h2>
              <p>
                Esta pesquisa coleta indicadores estruturais, operacionais, financeiros e de articulação de rede das
                instituições de acolhimento. Em nenhuma hipótese devem ser informados nomes, imagens, prontuários ou
                histórias individuais que identifiquem crianças, adolescentes ou suas famílias de origem.
              </p>
              <h2>2. Finalidade do diagnóstico e E-book institucional</h2>
              <p>
                As informações consolidadas serão utilizadas pela Fundação Net do Bem para mapear as demandas reais das
                casas de acolhimento, direcionar programas de apoio e publicar diagnósticos agregados e estatísticos
                sobre a realidade do acolhimento no Brasil.
              </p>
              <h2>3. Armazenamento e retomada</h2>
              <p>
                As respostas preenchidas ficam salvas automaticamente para permitir que a instituição responda os 14
                blocos no seu próprio ritmo.
              </p>
              <button className="button secondary" onClick={() => setResetDialog(true)}>
                <RotateCcw /> Limpar respostas salvas neste navegador
              </button>
            </div>
            <button className="button secondary" onClick={() => go(previous.current as Screen)}>
              <ArrowLeft /> Voltar
            </button>
          </section>
        )}

        {screen === 'journey' && (
          <section className="content">
            {titleNode(
              'MAPA DA EXPERIÊNCIA MVP-2',
              'Três olhares. Uma mesma rede.',
              'Explore a jornada com 14 blocos enxutos, Painel de Cards GSAP e celebrações por etapa.'
            )}
            <div className="journey-grid">
              {[
                {
                  icon: <ClipboardList />,
                  name: 'Quem responde a pesquisa',
                  steps: [
                    'Boas-vindas e Termo de Privacidade',
                    'Painel Geral de 14 Etapas em Cards (GSAP)',
                    'Componentes ágeis (QuintoAndar e Régua 0-5)',
                    'Celebração e incentivo ao final de cada bloco',
                    'Revisão e envio'
                  ],
                  screen: 'form'
                },
                {
                  icon: <Building2 />,
                  name: 'Quem gere a entidade',
                  steps: [
                    'Escolha da casa / unidade',
                    'Situação e progresso por etapa',
                    'Múltiplas casas no mesmo CNPJ',
                    'Equipe da mantenedora',
                    'Histórico da unidade'
                  ],
                  screen: 'portal'
                },
                {
                  icon: <Network />,
                  name: 'Quem gere a Fundação',
                  steps: [
                    'Visão geral da rede',
                    'Busca e filtros por etapa',
                    'Diagnóstico completo em 14 blocos',
                    'Devolutiva fundamentada',
                    'Insumos para o E-book diagnóstico'
                  ],
                  screen: 'admin'
                }
              ].map(j => (
                <article className="panel" key={j.name}>
                  {j.icon}
                  <h2>{j.name}</h2>
                  <ol className="timeline">
                    {j.steps.map(s => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <button className="button primary" onClick={() => go(j.screen as Screen, 'cards')}>
                    Explorar jornada <ArrowRight />
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {screen !== 'form' && screen !== 'intro' && (
        <footer>
          <span>Fundação Net do Bem · Cuidado que se conecta.</span>
          <div>
            <button className="text-button" onClick={() => go('privacy')}>
              Privacidade
            </button>
            <button className="text-button" onClick={() => setResetDialog(true)}>
              Reiniciar respostas
            </button>
          </div>
        </footer>
      )}

      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 />
          {toast}
          <button aria-label="Fechar mensagem" onClick={() => setToast('')}>
            <X />
          </button>
        </div>
      )}

      {storageError && (
        <div className="storage-warning" role="alert">
          Seu navegador não permitiu salvar automaticamente. Evite fechar a aba antes de concluir.
        </div>
      )}

      {resetDialog && (
        <div
          className="modal-backdrop"
          onKeyDown={e => {
            if (e.key === 'Escape') setResetDialog(false);
          }}
        >
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title">
            <h2 id="reset-title">Limpar todas as respostas salvas neste navegador?</h2>
            <p>As respostas e unidades salvas localmente serão reiniciadas.</p>
            <div className="actions">
              <button id="cancel-reset" className="button secondary" onClick={() => setResetDialog(false)}>
                Manter respostas
              </button>
              <button
                id="confirm-reset"
                className="button primary"
                onClick={() => {
                  setState(fresh());
                  setResetDialog(false);
                  setSelected('');
                  setFilter('Todas');
                  setSearch('');
                  go('intro');
                  setToast('Respostas reiniciadas.');
                }}
              >
                Reiniciar
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

