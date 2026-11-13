import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  LayoutGrid,
  Printer,
  Send,
  Sparkles,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Radar
} from 'lucide-react';
import data from './questionnaire.json';
import { BLOCK_ICONS } from './Survey';
import { answered, validate, formatAnswerSummary } from './domain.mjs';

type Q = (typeof data.questions)[number];

export type BlockReportStat = {
  index: number;
  id: string;
  number: number;
  title: string;
  intro: string;
  answeredCount: number;
  totalCount: number;
  pct: number;
  status: 'completed' | 'in_progress' | 'pending';
  questions: {
    id: string;
    page: string;
    label: string;
    required: boolean;
    isAnswered: boolean;
    summary: string;
  }[];
};

export function computeBlockReportStats(questions: Q[], answers: Record<string, any>): BlockReportStat[] {
  return data.blocks.map((b, i) => {
    const qs = questions.filter(q => q.block === i);
    const mappedQs = qs.map(q => {
      const ok = Boolean(answered(q, answers[q.id]) && !validate(q, answers[q.id]));
      return {
        id: q.id,
        page: q.page,
        label: q.label,
        required: Boolean(q.required),
        isAnswered: ok,
        summary: formatAnswerSummary(q, answers[q.id])
      };
    });
    const answeredCount = mappedQs.filter(q => q.isAnswered).length;
    const totalCount = mappedQs.length;
    const pct = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
    const status: 'completed' | 'in_progress' | 'pending' =
      answeredCount === totalCount && totalCount > 0
        ? 'completed'
        : answeredCount > 0
        ? 'in_progress'
        : 'pending';

    return {
      index: i,
      id: b.id,
      number: b.number,
      title: b.title,
      intro: b.intro,
      answeredCount,
      totalCount,
      pct,
      status,
      questions: mappedQs
    };
  });
}

const MACRO_AXES = [
  { id: 'identidade_estrutura', label: 'Identidade & Estrutura', shortLabel: 'Estrutura', blocks: [0, 1] },
  { id: 'acolhimento_pessoas', label: 'Acolhimento & Equipe', shortLabel: 'Acolhimento', blocks: [2, 3] },
  { id: 'governanca_financas', label: 'Governança & Finanças', shortLabel: 'Governança', blocks: [4, 5, 6] },
  { id: 'saude_educacao_cuidado', label: 'Saúde, Educação & Cuidado', shortLabel: 'Cuidado', blocks: [7, 8, 9] },
  { id: 'rede_vinculos', label: 'Rede & Vínculos', shortLabel: 'Rede & Família', blocks: [10, 11] },
  { id: 'melhoria_futuro', label: 'Melhoria & Futuro', shortLabel: 'Futuro', blocks: [12, 13] }
];

function escapeCsvCell(val: unknown): string {
  const s = String(val ?? '').replace(/\r?\n|\r/g, ' ').trim();
  if (s.includes(';') || s.includes('"') || s.includes(',')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function exportUnitReportCsv(params: {
  unitName: string;
  unitCity: string;
  unitStatus: string;
  org: Record<string, any>;
  questions: Q[];
  answers: Record<string, any>;
}) {
  const { unitName, unitCity, unitStatus, org, questions, answers } = params;
  const stats = computeBlockReportStats(questions, answers);
  const totalAns = stats.reduce((acc, s) => acc + s.answeredCount, 0);
  const totalQs = stats.reduce((acc, s) => acc + s.totalCount, 0);
  const overallPct = totalQs > 0 ? Math.round((totalAns / totalQs) * 100) : 0;

  const lines: string[] = [];

  // Metadados da Instituição
  lines.push(['RELATÓRIO DIAGNÓSTICO INSTITUCIONAL - FUNDAÇÃO NET DO BEM (MVP-3)'].map(escapeCsvCell).join(';'));
  lines.push(
    [
      'Mantenedora',
      org.entidade || 'Não informada',
      'CNPJ',
      org.cnpj || 'Não informado',
      'Data Exportação',
      new Date().toLocaleString('pt-BR')
    ]
      .map(escapeCsvCell)
      .join(';')
  );
  lines.push(
    [
      'Casa / Unidade',
      unitName,
      'Município / UF',
      `${unitCity || answers.cidade || ''} - ${answers.uf || 'SP'}`,
      'Status',
      unitStatus,
      'Preenchimento Geral',
      `${overallPct}% (${totalAns}/${totalQs})`
    ]
      .map(escapeCsvCell)
      .join(';')
  );
  lines.push(
    [
      'Responsável',
      org.gestor || 'Não informado',
      'Função',
      org.funcao || 'Não informada',
      'E-mail',
      org.email || 'Não informado',
      'Telefone',
      org.telefone || 'Não informado'
    ]
      .map(escapeCsvCell)
      .join(';')
  );
  lines.push('');

  // Resumo por Etapa
  lines.push(['RESUMO DAS 14 ETAPAS TEMÁTICAS'].map(escapeCsvCell).join(';'));
  lines.push(['Etapa', 'Título da Etapa', 'Respondidas', 'Total de Questões', '% Concluído', 'Situação'].map(escapeCsvCell).join(';'));
  for (const s of stats) {
    const statusText = s.status === 'completed' ? 'Concluída' : s.status === 'in_progress' ? 'Em andamento' : 'Pendente';
    lines.push([`Etapa ${String(s.number).padStart(2, '0')}`, s.title, s.answeredCount, s.totalCount, `${s.pct}%`, statusText].map(escapeCsvCell).join(';'));
  }
  lines.push('');

  // Respostas Detalhadas
  lines.push(['RESPOSTAS DETALHADAS DO QUESTIONÁRIO'].map(escapeCsvCell).join(';'));
  lines.push(['Nº Etapa', 'Etapa Temática', 'Subtema / Seção', 'Código', 'Pergunta', 'Obrigatória', 'Status', 'Resposta Registrada'].map(escapeCsvCell).join(';'));

  for (const s of stats) {
    for (const q of s.questions) {
      lines.push(
        [
          `Etapa ${String(s.number).padStart(2, '0')}`,
          s.title,
          q.page,
          q.id,
          q.label,
          q.required ? 'Sim' : 'Opcional',
          q.isAnswered ? 'Preenchida' : 'Em branco',
          q.summary
        ]
          .map(escapeCsvCell)
          .join(';')
      );
    }
  }

  // UTF-8 BOM para abrir com acentuação perfeita no Microsoft Excel
  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const slug = unitName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  a.href = url;
  a.download = `relatorio-netdobem-${slug || 'unidade'}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportAllUnitsNetworkCsv(params: {
  org: Record<string, any>;
  units: { id: string; name: string; city: string; status: string; answers: Record<string, any>; snapshot?: Record<string, any> }[];
  allQuestions: Q[];
}) {
  const { org, units, allQuestions } = params;
  const lines: string[] = [];
  lines.push(['BASE CONSOLIDADA DE UNIDADES E RESPOSTAS - FUNDAÇÃO NET DO BEM (MVP-3)'].map(escapeCsvCell).join(';'));
  lines.push(
    [
      'ID Unidade',
      'Nome da Casa',
      'Município',
      'UF',
      'Mantenedora',
      'CNPJ',
      'Responsável / Gestor',
      'E-mail',
      'Telefone',
      'Status do Diagnóstico',
      'Questões Respondidas',
      'Total de Questões',
      '% Preenchido',
      ...data.blocks.map(b => `Etapa ${b.number}: ${b.title} (%)`)
    ]
      .map(escapeCsvCell)
      .join(';')
  );

  for (const u of units) {
    const merged: Record<string, any> = { uf: 'SP', ...u.answers, ...(u.snapshot || {}), ...org };
    const stats = computeBlockReportStats(allQuestions, merged);
    const ansCount = stats.reduce((acc, s) => acc + s.answeredCount, 0);
    const totCount = stats.reduce((acc, s) => acc + s.totalCount, 0);
    const pct = totCount > 0 ? Math.round((ansCount / totCount) * 100) : 0;

    lines.push(
      [
        u.id,
        u.name,
        u.city || merged.cidade || '',
        merged.uf || 'SP',
        merged.entidade || '',
        merged.cnpj || '',
        merged.gestor || '',
        merged.email || '',
        merged.telefone || '',
        u.status,
        ansCount,
        totCount,
        `${pct}%`,
        ...stats.map(s => `${s.pct}%`)
      ]
        .map(escapeCsvCell)
        .join(';')
    );
  }

  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `base-rede-netdobem-mvp3.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ParticipantOnboarding({
  hasOrgIdentity,
  percent,
  doneBlocksCount,
  status,
  onOpenPanel,
  onOpenReport,
  onExportCsv
}: {
  hasOrgIdentity: boolean;
  percent: number;
  doneBlocksCount: number;
  status: string;
  onOpenPanel: () => void;
  onOpenReport: () => void;
  onExportCsv: () => void;
}) {
  const isSubmitted = status !== 'Rascunho';
  const steps = [
    {
      num: '01',
      title: 'Identificação e Casa',
      desc: 'Vincule os dados da mantenedora (CNPJ) e escolha a casa em acompanhamento.',
      done: hasOrgIdentity || percent > 0,
      actionLabel: 'Revisar Etapa 1',
      onClick: onOpenPanel
    },
    {
      num: '02',
      title: '14 Etapas em Cards',
      desc: 'Responda no seu ritmo ou convide até 3 colaboradores da equipe.',
      done: doneBlocksCount === 14 || percent >= 100,
      badge: `${doneBlocksCount}/14 etapas (${percent}%)`,
      actionLabel: 'Ir para o Painel',
      onClick: onOpenPanel
    },
    {
      num: '03',
      title: 'Radar & Relatório .CSV',
      desc: 'Acompanhe o gráfico de radar por eixo temático e baixe sua planilha .CSV.',
      done: percent >= 30,
      actionLabel: 'Exportar .CSV',
      onClick: onExportCsv
    },
    {
      num: '04',
      title: 'Revisão e Envio',
      desc: 'Confira o relatório consolidado com ícones e envie para a Fundação Net do Bem.',
      done: isSubmitted,
      actionLabel: isSubmitted ? 'Ver Enviado' : 'Revisar e Enviar',
      onClick: onOpenReport
    }
  ];

  return (
    <section className="onboarding-strip" aria-label="Passo a passo do participante">
      <div className="onboarding-strip-head">
        <div>
          <span className="eyebrow">JORNADA DO PARTICIPANTE · PASSO A PASSO</span>
          <h2>Como funciona o diagnóstico da sua instituição</h2>
        </div>
        <span className="badge success">{percent}% preenchido no total</span>
      </div>
      <div className="onboarding-steps-grid">
        {steps.map(s => (
          <article key={s.num} className={`onboarding-step-card ${s.done ? 'is-done' : ''}`}>
            <div className="onboarding-step-top">
              <span className="onboarding-step-num">{s.num}</span>
              {s.done ? (
                <span className="onboarding-status-pill done">
                  <CheckCircle2 size={14} /> Concluído
                </span>
              ) : (
                <span className="onboarding-status-pill pending">
                  <Clock size={14} /> {s.badge || 'Em aberto'}
                </span>
              )}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <button type="button" className="onboarding-step-link" onClick={s.onClick}>
              <span>{s.actionLabel}</span>
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DiagnosticRadarSection({
  blockStats,
  onSelectBlock,
  onExportCsv
}: {
  blockStats: BlockReportStat[];
  onSelectBlock: (blockIndex: number) => void;
  onExportCsv: () => void;
}) {
  const [radarMode, setRadarMode] = useState<'6axes' | '14blocks'>('6axes');

  const pointsData =
    radarMode === '6axes'
      ? MACRO_AXES.map(axis => {
          const matching = blockStats.filter(b => axis.blocks.includes(b.index));
          const ans = matching.reduce((acc, m) => acc + m.answeredCount, 0);
          const tot = matching.reduce((acc, m) => acc + m.totalCount, 0);
          const pct = tot > 0 ? Math.round((ans / tot) * 100) : 0;
          return {
            label: axis.shortLabel,
            fullLabel: axis.label,
            pct,
            detail: `${ans}/${tot} questões`
          };
        })
      : blockStats.map(b => ({
          label: `${b.number}. ${b.title.split(' ')[0]}`,
          fullLabel: `${b.number}. ${b.title}`,
          pct: b.pct,
          detail: `${b.answeredCount}/${b.totalCount} questões`
        }));

  const count = pointsData.length;
  const cx = 210;
  const cy = 165;
  const maxR = 96;
  const levels = [25, 50, 75, 100];

  const polarToCartesian = (idx: number, radiusPct: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    const r = (radiusPct / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  const polygonPoints = pointsData
    .map((d, i) => {
      const pt = polarToCartesian(i, Math.max(d.pct, 6));
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <section className="panel radar-report-panel">
      <div className="section-head radar-head">
        <div>
          <span className="eyebrow">VISÃO ANALÍTICA DA CASA · GRÁFICO DE RADAR</span>
          <h2>Mapa de Preenchimento e Maturidade por Eixo</h2>
          <p>Visualize rapidamente o avanço da sua instituição em cada dimensão da pesquisa e exporte em formato .CSV.</p>
        </div>
        <div className="radar-head-actions">
          <div className="context-view-pills">
            <button
              type="button"
              className={'context-pill-btn ' + (radarMode === '6axes' ? 'active' : '')}
              onClick={() => setRadarMode('6axes')}
            >
              <Radar size={14} />
              <span>6 Eixos</span>
            </button>
            <button
              type="button"
              className={'context-pill-btn ' + (radarMode === '14blocks' ? 'active' : '')}
              onClick={() => setRadarMode('14blocks')}
            >
              <LayoutGrid size={14} />
              <span>14 Etapas</span>
            </button>
          </div>
          <button type="button" className="button secondary compact-action-btn" onClick={onExportCsv}>
            <Download size={16} />
            <span>Exportar .CSV</span>
          </button>
        </div>
      </div>

      <div className="radar-layout-grid">
        <div className="radar-svg-card">
          <svg viewBox="0 0 420 330" className="radar-svg" role="img" aria-label="Gráfico de radar do diagnóstico">
            {/* Polígonos de grade (25%, 50%, 75%, 100%) */}
            {levels.map(lvl => {
              const ringPts = pointsData
                .map((_, i) => {
                  const pt = polarToCartesian(i, lvl);
                  return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                })
                .join(' ');
              return <polygon key={lvl} points={ringPts} className="radar-grid-ring" />;
            })}

            {/* Eixos radiais */}
            {pointsData.map((_, i) => {
              const end = polarToCartesian(i, 100);
              return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} className="radar-axis-line" />;
            })}

            {/* Polígono preenchido da Casa */}
            <polygon points={polygonPoints} className="radar-area-poly" />

            {/* Vértices e Labels */}
            {pointsData.map((d, i) => {
              const pt = polarToCartesian(i, Math.max(d.pct, 6));
              const labelPt = polarToCartesian(i, 118);
              const anchor =
                Math.abs(labelPt.x - cx) < 12 ? 'middle' : labelPt.x > cx ? 'start' : 'end';
              return (
                <g key={d.fullLabel}>
                  <circle cx={pt.x} cy={pt.y} r={4.5} className="radar-vertex-dot" />
                  <text
                    x={labelPt.x}
                    y={labelPt.y}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    className="radar-axis-label"
                  >
                    {d.label} ({d.pct}%)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="radar-legend-column">
          <div className="radar-axes-list">
            {MACRO_AXES.map(axis => {
              const matching = blockStats.filter(b => axis.blocks.includes(b.index));
              const ans = matching.reduce((acc, m) => acc + m.answeredCount, 0);
              const tot = matching.reduce((acc, m) => acc + m.totalCount, 0);
              const pct = tot > 0 ? Math.round((ans / tot) * 100) : 0;
              return (
                <div key={axis.id} className="radar-axis-card">
                  <div className="radar-axis-card-top">
                    <strong>{axis.label}</strong>
                    <span className="radar-axis-pct">{pct}%</span>
                  </div>
                  <div className="card-progress-bar">
                    <div className="card-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="radar-axis-chips">
                    {matching.map(b => {
                      const Icon = BLOCK_ICONS[b.index] || Building2;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          className={`axis-stage-chip ${b.status}`}
                          onClick={() => onSelectBlock(b.index)}
                          title={`Abrir Etapa ${b.number}: ${b.title}`}
                        >
                          <Icon size={13} />
                          <span>
                            {b.number}. {b.title} ({b.pct}%)
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailedIconReport({
  blockStats,
  onEditBlock,
  onExportCsv
}: {
  blockStats: BlockReportStat[];
  onEditBlock: (blockIndex: number) => void;
  onExportCsv: () => void;
}) {
  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>({ 0: true });
  const [onlyAnswered, setOnlyAnswered] = useState(false);

  const toggleBlock = (idx: number) => {
    setExpandedBlocks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = (open: boolean) => {
    const next: Record<number, boolean> = {};
    blockStats.forEach(b => {
      next[b.index] = open;
    });
    setExpandedBlocks(next);
  };

  return (
    <section className="icon-report-section">
      <div className="report-toolbar">
        <div>
          <span className="eyebrow">RELATÓRIO VISUAL POR ETAPA</span>
          <h2>Diagnóstico Detalhado das 14 Etapas</h2>
        </div>
        <div className="report-toolbar-actions">
          <button
            type="button"
            className="filter-tab"
            onClick={() => setOnlyAnswered(v => !v)}
          >
            {onlyAnswered ? 'Mostrar todas as perguntas' : 'Apenas perguntas respondidas'}
          </button>
          <button type="button" className="filter-tab" onClick={() => expandAll(true)}>
            Expandir tudo
          </button>
          <button type="button" className="filter-tab" onClick={() => expandAll(false)}>
            Recolher tudo
          </button>
          <button type="button" className="button secondary compact-action-btn" onClick={() => window.print()}>
            <Printer size={16} />
            <span>Imprimir / PDF</span>
          </button>
          <button type="button" className="button primary compact-action-btn" onClick={onExportCsv}>
            <Download size={16} />
            <span>Exportar .CSV</span>
          </button>
        </div>
      </div>

      <div className="icon-report-cards-list">
        {blockStats.map(b => {
          const Icon = BLOCK_ICONS[b.index] || Building2;
          const isOpen = Boolean(expandedBlocks[b.index]);
          const visibleQs = onlyAnswered ? b.questions.filter(q => q.isAnswered) : b.questions;
          const statusLabel =
            b.status === 'completed' ? 'Concluída' : b.status === 'in_progress' ? 'Em andamento' : 'Pendente';

          return (
            <article key={b.id} className={`icon-report-block-card ${b.status}`}>
              <div className="icon-report-block-head" onClick={() => toggleBlock(b.index)}>
                <div className="icon-report-block-left">
                  <div className="card-icon-box">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="icon-report-title-row">
                      <h3>
                        {String(b.number).padStart(2, '0')} · {b.title}
                      </h3>
                      <span className={`status-badge ${b.status}`}>{statusLabel}</span>
                    </div>
                    <p>{b.intro}</p>
                  </div>
                </div>

                <div className="icon-report-block-right">
                  <div className="icon-report-progress-col">
                    <div className="card-progress-meta">
                      <span>
                        {b.answeredCount}/{b.totalCount} questões
                      </span>
                      <strong>{b.pct}%</strong>
                    </div>
                    <div className="card-progress-bar">
                      <div className="card-progress-fill" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="button secondary compact-action-btn"
                    onClick={e => {
                      e.stopPropagation();
                      onEditBlock(b.index);
                    }}
                  >
                    Editar etapa
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={isOpen ? 'Recolher etapa' : 'Expandir etapa'}
                  >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="icon-report-answers-grid">
                  {visibleQs.length === 0 ? (
                    <p className="empty-block-msg">Nenhuma pergunta respondida nesta etapa até o momento.</p>
                  ) : (
                    visibleQs.map(q => (
                      <div key={q.id} className={`report-answer-item ${q.isAnswered ? 'answered' : 'unanswered'}`}>
                        <div className="report-answer-meta">
                          <span className="report-subpage">{q.page}</span>
                          <span className={`report-ans-dot ${q.isAnswered ? 'done' : 'pending'}`}>
                            {q.isAnswered ? '✓ Respondida' : 'Pendente'}
                          </span>
                        </div>
                        <span className="report-question-label">{q.label}</span>
                        <strong className="report-answer-value">{q.summary}</strong>
                      </div>
                    ))
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
