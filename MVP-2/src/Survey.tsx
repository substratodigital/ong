import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import {
  Building2,
  House,
  Sun,
  Users,
  ShieldCheck,
  Wallet,
  HandCoins,
  HeartPulse,
  GraduationCap,
  HeartHandshake,
  Network,
  Sprout,
  Compass,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Menu,
  X,
  Save,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  FileSpreadsheet,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Trash2
} from 'lucide-react';
import data from './questionnaire.json';
import { answered, validate } from './domain.mjs';

type Q = (typeof data.questions)[number];
type BlockMeta = (typeof data.blocks)[number];

export const BLOCK_ICONS = [
  Building2,      // 1. Sua entidade
  House,          // 2. Estrutura
  Sun,            // 3. Cotidiano e acolhimento
  Users,          // 4. Pessoas
  ShieldCheck,    // 5. Governança
  Wallet,         // 6. Sustentabilidade
  HandCoins,      // 7. Captação
  HeartPulse,     // 8. Saúde
  GraduationCap,  // 9. Educação
  HeartHandshake, // 10. Atendimento
  Network,        // 11. Rede de proteção
  House,          // 12. Vínculos familiares
  Sprout,         // 13. Plano de melhoria
  Compass         // 14. Impacto e futuro
];

export type SurveySubView = 'cards' | 'form' | 'celebration';

type Props = {
  question: Q;
  questions: Q[];
  answers: Record<string, any>;
  field: React.ReactNode;
  percent: number;
  saved: string;
  storageError: boolean;
  editable: boolean;
  unitName: string;
  userName: string;
  userRole?: string;
  userEmail?: string;
  orgName?: string;
  unitSelect: React.ReactNode;
  subView: SurveySubView;
  onChangeSubView: (v: SurveySubView) => void;
  onBlock: (i: number) => void;
  onToggleDemoBlockComplete: (blockIdx: number) => void;
  onNext: () => void;
  onBack: () => void;
  onReview: () => void;
  onExit: () => void;
  onOpenAdmin?: () => void;
  onResetSurvey?: () => void;
  forceTour?: boolean;
  onTourComplete?: () => void;
  last: boolean;
  first: boolean;
};

const TOUR_STORAGE_KEY = 'netdobem-tour-v2-seen';

const TOUR_STEPS = [
  {
    step: 1,
    tag: 'PASSO 1 DE 4 · BEM-VINDA AO PAINEL',
    title: 'Tudo organizado em etapas curtas e tranquilas',
    body: 'Dividimos a pesquisa em 14 cartões curtos para você responder sem pressa. Você pode pausar quando quiser e retomar depois: tudo o que você digita fica salvo sozinho.',
    pointerText: '✨ Aqui você acompanha quantas etapas já concluiu'
  },
  {
    step: 2,
    tag: 'PASSO 2 DE 4 · PRIMEIRO CARTÃO',
    title: 'Comece pelo cartão "1. Sua entidade"',
    body: 'Veja o primeiro cartão pulsando suavemente na tela! Para responder, basta tocar em "Iniciar etapa" dentro dele. As perguntas aparecem uma por vez, com letras grandes e fáceis de ler.',
    pointerText: '👆 Toque neste 1º cartão para iniciar'
  },
  {
    step: 3,
    tag: 'PASSO 3 DE 4 · CARTÕES QUE GANHAM VIDA',
    title: 'As ilustrações ganham cor conforme você avança',
    body: 'Repare que os cartões começam clarinhos. Conforme você preenche as respostas, a arte ganha cor e vida! Ao terminar cada bloco, a aba "Concluídos" mostra uma mensagem especial para a sua casa.',
    pointerText: '🎨 Seu progresso colorido etapa por etapa'
  },
  {
    step: 4,
    tag: 'PASSO 4 DE 4 · TUDO PRONTO!',
    title: 'Pronta para começar o diagnóstico da sua casa?',
    body: 'Agora você já conhece todo o painel! Se quiser rever esta explicação em qualquer momento, basta tocar no botão "Tutorial" no topo da tela. Vamos iniciar pela Etapa 1?',
    pointerText: '💚 Tudo pronto para iniciar a Etapa 1!'
  }
];

export function spawnCompletionParticles(targetElement: HTMLElement | null) {
  if (!targetElement) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = targetElement.getBoundingClientRect();
  const colors = ['#216e43', '#38a169', '#8fd1a8', '#f6ad55', '#195634'];

  for (let i = 0; i < 16; i++) {
    const dot = document.createElement('div');
    dot.className = 'gsap-particle';
    dot.style.backgroundColor = colors[i % colors.length];
    dot.style.left = `${rect.width / 2}px`;
    dot.style.top = `${rect.height / 2}px`;
    targetElement.appendChild(dot);

    const angle = (Math.PI * 2 * i) / 16;
    const distance = 45 + Math.random() * 60;

    gsap.fromTo(
      dot,
      { x: 0, y: 0, scale: 1.2, opacity: 1 },
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0,
        opacity: 0,
        duration: 0.65 + Math.random() * 0.25,
        ease: 'power3.out',
        onComplete: () => dot.remove()
      }
    );
  }
}

export function Survey(p: Props) {
  const [menu, setMenu] = useState(false);
  const [houses, setHouses] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [saveMenu, setSaveMenu] = useState(false);
  const [clearAlert, setClearAlert] = useState(false);
  const [cardFilter, setCardFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [tourStep, setTourStep] = useState<number | null>(() => {
    try {
      if (p.forceTour || localStorage.getItem(TOUR_STORAGE_KEY) !== '1') return 1;
    } catch { }
    return null;
  });
  const ref = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const celebBoxRef = useRef<HTMLDivElement>(null);
  const tourBalloonRef = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const direction = useRef(1);

  useEffect(() => {
    if (p.forceTour) {
      p.onChangeSubView('cards');
      setCardFilter('all');
      setTourStep(1);
    }
  }, [p.forceTour]);

  const finishTour = (openFirstBlock = false) => {
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, '1');
    } catch { }
    setTourStep(null);
    p.onTourComplete?.();
    if (openFirstBlock) {
      p.onBlock(0);
      p.onChangeSubView('form');
    }
  };

  // GSAP animation for the 4-step Onboarding Balloon Tutorial & Card 1 gentle pulse
  useLayoutEffect(() => {
    if (tourStep === null || p.subView !== 'cards') return;
    const card0 = document.getElementById('stage-card-0');
    const card0Cta = card0?.querySelector('.card-cta');
    const balloon = tourBalloonRef.current;

    if (tourStep === 2 || tourStep === 4) {
      card0?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (tourStep === 1) {
      document.querySelector('.cards-hub-viewport')?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (balloon) {
        gsap.fromTo(
          balloon,
          { opacity: 0, y: 18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.36, ease: 'back.out(1.5)' }
        );
      }

      if (card0 && (tourStep === 2 || tourStep === 3 || tourStep === 4)) {
        gsap.to(card0, {
          y: -7,
          scale: 1.024,
          boxShadow: '0 0 0 4px #2f6f4c, 0 20px 42px rgba(33, 110, 67, 0.28)',
          duration: 0.85,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      if (card0Cta && (tourStep === 2 || tourStep === 4)) {
        gsap.to(card0Cta, {
          scale: 1.04,
          backgroundColor: '#216e43',
          color: '#ffffff',
          borderColor: '#216e43',
          duration: 0.65,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    return () => {
      mm.revert();
      if (card0) gsap.set(card0, { clearProps: 'transform,boxShadow' });
      if (card0Cta) gsap.set(card0Cta, { clearProps: 'transform,backgroundColor,color,borderColor' });
    };
  }, [tourStep, p.subView]);

  const currentBlockIdx = p.question.block;
  const block: BlockMeta = data.blocks[currentBlockIdx];
  const Icon = BLOCK_ICONS[currentBlockIdx] || Building2;
  const blockQs = p.questions.filter(q => q.block === currentBlockIdx);
  const position = blockQs.findIndex(q => q.id === p.question.id) + 1;
  const isLastInBlock = position === blockQs.length;

  // Compute block statuses
  const blockStats = data.blocks.map((b, i) => {
    const qs = p.questions.filter(q => q.block === i);
    const ansCount = qs.filter(q => answered(q, p.answers[q.id]) && !validate(q, p.answers[q.id])).length;
    const total = qs.length;
    const pct = total > 0 ? Math.round((ansCount / total) * 100) : 0;
    const status: 'completed' | 'in_progress' | 'pending' =
      ansCount === total && total > 0
        ? 'completed'
        : ansCount > 0 || (p.subView === 'form' && i === currentBlockIdx)
          ? 'in_progress'
          : 'pending';
    return { block: b, index: i, qs, ansCount, total, pct, status };
  });

  const doneBlocksCount = blockStats.filter(b => b.status === 'completed').length;
  const pendingBlocksCount = blockStats.length - doneBlocksCount;
  const blocksCompletionPct = Math.round((doneBlocksCount / blockStats.length) * 100);

  // Animate form question transitions
  useLayoutEffect(() => {
    if (p.subView !== 'form') return;
    title.current?.focus({ preventScroll: true });
    ref.current?.parentElement?.scrollTo({ top: 0 });
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: direction.current * 20 },
          { opacity: 1, x: 0, duration: 0.32, ease: 'power3.out', clearProps: 'opacity,transform' }
        );
      }
    });
    return () => mm.revert();
  }, [p.question.id, p.subView]);

  // Animate Cards Hub stagger entry and progress bars
  useLayoutEffect(() => {
    if (p.subView !== 'cards' || !cardsGridRef.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = cardsGridRef.current?.querySelectorAll('.stage-card');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 22, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.44,
            stagger: 0.04,
            ease: 'back.out(1.25)',
            clearProps: 'transform'
          }
        );
      }
      const bars = cardsGridRef.current?.querySelectorAll<HTMLElement>('.card-progress-fill');
      bars?.forEach(bar => {
        const target = bar.getAttribute('data-target-pct') || '0';
        gsap.fromTo(bar, { width: '0%' }, { width: `${target}%`, duration: 0.6, ease: 'power3.out' });
      });
    });
    return () => mm.revert();
  }, [p.subView, cardFilter]);

  // Animate Celebration view
  useLayoutEffect(() => {
    if (p.subView !== 'celebration' || !celebBoxRef.current) return;
    const box = celebBoxRef.current;
    spawnCompletionParticles(box);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      const art = box.querySelector('.celeb-art img');
      if (art) {
        tl.fromTo(
          art,
          { filter: 'grayscale(1) contrast(0.6) brightness(1.12)', scale: 1.06 },
          { filter: 'grayscale(0) contrast(1) brightness(1)', scale: 1, duration: 1.1, ease: 'power2.out' },
          0
        );
      }
      tl.fromTo(box, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42, ease: 'back.out(1.6)' }, 0)
        .fromTo(
          box.querySelector('.celeb-icon-ring'),
          { scale: 0, rotation: -35 },
          { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1.1, 0.5)' },
          '-=0.2'
        )
        .fromTo(
          box.querySelector('.celeb-check-badge'),
          { scale: 0 },
          { scale: 1, duration: 0.35, ease: 'back.out(2.5)' },
          '-=0.25'
        );
    });
    return () => mm.revert();
  }, [p.subView, currentBlockIdx]);

  // Card hover handlers with GSAP micro-animations
  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>, animType: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = e.currentTarget;
    const iconBox = card.querySelector('.card-icon-box');
    const iconSvg = iconBox?.querySelector('svg');
    const ctaArrow = card.querySelector('.card-cta-arrow');
    const glow = card.querySelector('.card-glow');

    gsap.to(card, {
      y: -6,
      scale: 1.012,
      boxShadow: '0 16px 34px rgba(20, 65, 40, 0.12)',
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    if (glow) gsap.to(glow, { opacity: 1, duration: 0.28 });
    if (ctaArrow) gsap.to(ctaArrow, { x: 4, duration: 0.25, ease: 'power2.out' });
    if (iconBox) gsap.to(iconBox, { scale: 1.1, duration: 0.28, ease: 'back.out(2)' });

    if (iconSvg) {
      gsap.killTweensOf(iconSvg);
      if (animType === 'spinGlow') {
        gsap.to(iconSvg, { rotation: 45, scale: 1.12, duration: 0.45, ease: 'back.out(1.7)' });
      } else if (animType === 'heartbeat') {
        gsap.fromTo(iconSvg, { scale: 1 }, { scale: 1.24, duration: 0.18, yoyo: true, repeat: 3, ease: 'power1.inOut' });
      } else if (animType === 'sproutGrow') {
        gsap.fromTo(
          iconSvg,
          { scaleY: 0.82, transformOrigin: 'bottom center' },
          { scaleY: 1.18, scaleX: 1.08, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' }
        );
      } else if (animType === 'shieldPulse') {
        gsap.to(iconSvg, { rotationY: 25, scale: 1.14, duration: 0.35, ease: 'power2.out' });
      } else if (animType === 'capToss') {
        gsap.to(iconSvg, { y: -4, rotation: -10, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' });
      } else {
        gsap.to(iconSvg, { rotation: -8, scale: 1.12, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' });
      }
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const glow = card.querySelector('.card-glow');
    if (!glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - 90;
    const y = e.clientY - rect.top - 90;
    gsap.to(glow, { x, y, duration: 0.22, ease: 'power2.out' });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconBox = card.querySelector('.card-icon-box');
    const iconSvg = iconBox?.querySelector('svg');
    const ctaArrow = card.querySelector('.card-cta-arrow');
    const glow = card.querySelector('.card-glow');

    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: '0 2px 8px rgba(20, 50, 35, 0.04)',
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.28 });
    if (ctaArrow) gsap.to(ctaArrow, { x: 0, duration: 0.25, ease: 'power2.out' });
    if (iconBox) gsap.to(iconBox, { scale: 1, duration: 0.28, ease: 'power2.out' });
    if (iconSvg) {
      gsap.to(iconSvg, { rotation: 0, rotationY: 0, scale: 1, scaleX: 1, scaleY: 1, y: 0, duration: 0.28, ease: 'power2.out' });
    }
  };

  const openBlockFromCard = (idx: number, cardEl: HTMLElement | null) => {
    direction.current = idx >= currentBlockIdx ? 1 : -1;
    if (cardEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(cardEl, {
        scale: 1.03,
        duration: 0.18,
        ease: 'power2.out',
        onComplete: () => {
          p.onBlock(idx);
          p.onChangeSubView('form');
          setMenu(false);
        }
      });
    } else {
      p.onBlock(idx);
      p.onChangeSubView('form');
      setMenu(false);
    }
  };

  const jumpFromSidebar = (idx: number) => {
    direction.current = idx >= currentBlockIdx ? 1 : -1;
    p.onBlock(idx);
    p.onChangeSubView('form');
    setMenu(false);
  };

  const [menuSlot, setMenuSlot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setMenuSlot(document.getElementById('survey-menu-slot'));
  }, []);

  const filteredCards = blockStats.filter(b => {
    if (cardFilter === 'completed') return b.status === 'completed';
    if (cardFilter === 'pending') return b.status !== 'completed';
    return true;
  });

  const nextBlockMeta = data.blocks[currentBlockIdx + 1] || null;
  const NextBlockIcon = nextBlockMeta ? BLOCK_ICONS[currentBlockIdx + 1] || Building2 : CheckCircle2;
  const nextBlockQsCount = nextBlockMeta ? p.questions.filter(q => q.block === currentBlockIdx + 1).length : 0;

  const renderSaveDropdown = () => (
    <div className="save-dropdown-wrap">
      <button
        type="button"
        className="survey-save survey-save-btn"
        aria-expanded={saveMenu}
        onClick={() => {
          setSaveMenu(v => !v);
          setHouses(false);
          setUserMenu(false);
        }}
        title="Opções de salvamento"
      >
        {p.storageError ? (
          'Falha ao salvar'
        ) : p.saved ? (
          <>
            <Check size={14} /> <span>Salvo</span>
          </>
        ) : (
          <>
            <Check size={14} /> <span>Salvo</span>
          </>
        )}
        <ChevronDown size={13} />
      </button>

      {saveMenu && (
        <div className="save-dropdown-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            className="save-clear-option"
            onClick={() => {
              setSaveMenu(false);
              setClearAlert(true);
            }}
          >
            <Trash2 size={15} />
            <span>Apagar</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section className="survey-shell">
      {menuSlot &&
        createPortal(
          <>
            <button
              className="mobile-menu-trigger"
              aria-label="Ver etapas"
              aria-expanded={menu}
              aria-controls="survey-navigation"
              onClick={() => setMenu(!menu)}
            >
              <Menu size={20} />
              <span>Etapas ({doneBlocksCount}/14)</span>
              <ChevronDown size={15} />
            </button>

            <div className="desktop-header-bar">
              <div className="header-identity-group">
                <div className="identity-chip-wrap">
                  <button
                    type="button"
                    className="house-toggle"
                    onClick={() => {
                      setHouses(!houses);
                      setUserMenu(false);
                    }}
                    aria-expanded={houses}
                    title="Casa de acolhimento vinculada"
                  >
                    <House strokeWidth={1.7} />
                    <span className="identity-meta">
                      <small>Casa vinculada</small>
                      <strong>{p.unitName}</strong>
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  {houses && (
                    <div className="house-popover">
                      <div className="popover-head">
                        <strong>Unidades da Mantenedora</strong>
                        <small>{p.orgName || 'CNPJ vinculado'}</small>
                      </div>
                      {p.unitSelect}
                      <div className="popover-actions">
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => {
                            setHouses(false);
                            p.onExit();
                          }}
                        >
                          Gerenciar casas
                        </button>
                        <button type="button" className="button secondary compact-btn" onClick={() => setHouses(false)}>
                          Concluir
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="identity-chip-wrap">
                  <button
                    type="button"
                    className="user-toggle"
                    onClick={() => {
                      setUserMenu(!userMenu);
                      setHouses(false);
                    }}
                    aria-expanded={userMenu}
                    title="Dados do usuário responsável pelo preenchimento"
                  >
                    <Users strokeWidth={1.7} />
                    <span className="identity-meta">
                      <small>{p.userRole || 'Participante'}</small>
                      <strong>{p.userName}</strong>
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  {userMenu && (
                    <div className="user-popover">
                      <div className="popover-head">
                        <span className="gov-badge">Nível 1 · Participante da Pesquisa</span>
                        <strong>{p.userName}</strong>
                        <small>
                          {p.userRole || 'Responsável pelo preenchimento'}
                          {p.userEmail ? ` · ${p.userEmail}` : ''}
                        </small>
                      </div>
                      <div className="popover-gov-links">
                        <button
                          type="button"
                          className="gov-link-btn"
                          onClick={() => {
                            setUserMenu(false);
                            p.onExit();
                          }}
                        >
                          <Building2 size={16} />
                          <div>
                            <strong>Minha Entidade (Onboarding & Casas)</strong>
                            <small>Casas vinculadas, gráfico de radar e equipe</small>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="gov-link-btn"
                          onClick={() => {
                            setUserMenu(false);
                            p.onReview();
                          }}
                        >
                          <FileSpreadsheet size={16} />
                          <div>
                            <strong>Relatório da Pesquisa & .CSV</strong>
                            <small>Visualização com ícones, radar e exportação</small>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="context-view-pills" role="tablist" aria-label="Modo de visualização">
                <button
                  type="button"
                  className={'context-pill-btn ' + (p.subView === 'cards' ? 'active' : '')}
                  onClick={() => p.onChangeSubView('cards')}
                >
                  <LayoutGrid size={15} />
                  <span>Painel</span>
                </button>
                <button
                  type="button"
                  className={'context-pill-btn ' + (p.subView === 'form' ? 'active' : '')}
                  onClick={() => p.onChangeSubView('form')}
                >
                  <FileSpreadsheet size={15} />
                  <span>Formulário</span>
                </button>
                <button
                  type="button"
                  className={'context-pill-btn ' + (p.subView === 'celebration' ? 'active' : '')}
                  onClick={() => p.onChangeSubView('celebration')}
                  title="Visualizar etapas concluídas e mensagem da etapa"
                >
                  <Sparkles size={15} />
                  <span>Concluídos</span>
                </button>
              </div>

              {renderSaveDropdown()}
            </div>
          </>,
          menuSlot
        )}

      {/* BARRA LATERAL ESQUERDA COM OS 14 BLOCOS */}
      <aside
        id="survey-navigation"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            setMenu(false);
            document.querySelector<HTMLButtonElement>('.mobile-menu-trigger')?.focus();
          }
        }}
        className={'survey-sidebar ' + (menu ? 'is-open' : '')}
        aria-label="Blocos da pesquisa"
      >
        <div className="side-intro">
          <span>Pesquisa institucional</span>
          <strong className="sidebar-count-pill">
            {doneBlocksCount}/{data.blocks.length}
          </strong>
          <button className="icon-button mobile-control" aria-label="Fechar etapas" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>

        <button
          type="button"
          className={'cards-overview-nav-btn ' + (p.subView === 'cards' ? 'active' : '')}
          onClick={() => {
            p.onChangeSubView('cards');
            setMenu(false);
          }}
        >
          <LayoutGrid size={19} />
          <span>Painel</span>
        </button>

        <nav aria-label="Etapas da pesquisa" className="sidebar-blocks-scroll">
          {blockStats.map(({ block: b, index: i, status }) => {
            const I = BLOCK_ICONS[i] || Building2;
            const isCurrent = (p.subView === 'form' || p.subView === 'celebration') && currentBlockIdx === i;
            return (
              <button
                key={b.id}
                type="button"
                className={isCurrent ? 'current' : ''}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => jumpFromSidebar(i)}
              >
                <I strokeWidth={1.7} />
                <span>
                  {b.number}. {b.title}
                </span>
                {status === 'completed' && (
                  <span className="nav-status-dot done" title="Concluído" aria-label="Preenchido">
                    ✓
                  </span>
                )}
                {status === 'in_progress' && !isCurrent && (
                  <span className="nav-status-dot progress" title="Em andamento">
                    •
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer-bar" role="group" aria-label="Atalhos do usuário e saída">
          <button
            type="button"
            className="sidebar-footer-item"
            onClick={() => {
              setMenu(false);
              p.onExit();
            }}
            title={`Usuário: ${p.userName}`}
          >
            <Users size={16} strokeWidth={1.8} />
            <span>Usuário</span>
          </button>

          <button
            type="button"
            className="sidebar-footer-item"
            onClick={() => {
              setMenu(false);
              p.onExit();
            }}
            title={`Casa: ${p.unitName}`}
          >
            <House size={16} strokeWidth={1.8} />
            <span>Casa</span>
          </button>

          <button
            type="button"
            className="sidebar-footer-item exit"
            onClick={() => {
              setMenu(false);
              p.onExit();
            }}
            title="Salvar e sair"
          >
            <Save size={16} strokeWidth={1.8} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DIREITA */}
      <div className="survey-area">
        {/* TOPBAR DE CONTEXTO (VISÍVEL NO MOBILE) */}
        <div className="survey-context">
          <div className="context-view-pills">
            <button
              type="button"
              className={'context-pill-btn ' + (p.subView === 'cards' ? 'active' : '')}
              onClick={() => p.onChangeSubView('cards')}
            >
              <LayoutGrid size={14} />
              <span>Painel</span>
            </button>
            <button
              type="button"
              className={'context-pill-btn ' + (p.subView === 'form' ? 'active' : '')}
              onClick={() => p.onChangeSubView('form')}
            >
              <FileSpreadsheet size={14} />
              <span>Formulário</span>
            </button>
            <button
              type="button"
              className={'context-pill-btn ' + (p.subView === 'celebration' ? 'active' : '')}
              onClick={() => p.onChangeSubView('celebration')}
              title="Visualizar etapas concluídas"
            >
              <Sparkles size={14} />
              <span>Concluídos</span>
            </button>
          </div>

          {renderSaveDropdown()}
        </div>

        {/* VIEW 1: PAINEL GERAL DE ETAPAS EM CARDS (HUB PÓS-CAPA COM GSAP) */}
        {p.subView === 'cards' && (
          <div className="question-viewport cards-hub-viewport">
            <div className="cards-hub-container">
              <div className={'filter-tabs compact-hub-bar ' + (tourStep === 1 || tourStep === 3 ? 'tour-focus-target' : '')}>
                <div className="filter-tabs-left">
                  <button
                    type="button"
                    className={'filter-tab ' + (cardFilter === 'all' ? 'active' : '')}
                    onClick={() => setCardFilter('all')}
                  >
                    Etapas ({blockStats.length})
                  </button>
                  <button
                    type="button"
                    className={'filter-tab ' + (cardFilter === 'completed' ? 'active' : '')}
                    onClick={() => setCardFilter('completed')}
                  >
                    Concluídas
                  </button>
                  <button
                    type="button"
                    className={'filter-tab ' + (cardFilter === 'pending' ? 'active' : '')}
                    onClick={() => setCardFilter('pending')}
                  >
                    Incompletas
                  </button>
                </div>

                <div className="hub-bar-right">
                  <button
                    type="button"
                    className="tour-help-btn"
                    onClick={() => {
                      setCardFilter('all');
                      setTourStep(1);
                    }}
                    title="Abrir tutorial passo a passo em 4 balões"
                  >
                    <HelpCircle size={15} />
                    <span>Tutorial</span>
                  </button>
                </div>
              </div>

              <div className="cards-grid" ref={cardsGridRef}>
                {filteredCards.map(({ block: b, index: realIdx, ansCount, total, pct, status }) => {
                  const CardIcon = BLOCK_ICONS[realIdx] || Building2;
                  const statusLabel =
                    status === 'completed' ? '✓ Concluído' : status === 'in_progress' ? 'Em andamento' : 'Não concluído';
                  const ctaText =
                    status === 'completed'
                      ? 'Revisar etapa'
                      : status === 'in_progress'
                        ? 'Continuar etapa'
                        : 'Iniciar etapa';

                  const isTourTargetCard = realIdx === 0 && (tourStep === 2 || tourStep === 3 || tourStep === 4);

                  return (
                    <div
                      key={b.id}
                      id={`stage-card-${realIdx}`}
                      className={`stage-card ${status} ${isTourTargetCard ? 'tour-card-highlight' : ''}`}
                      data-anim={b.animType}
                      onMouseEnter={e => handleCardMouseEnter(e, b.animType)}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onClick={e => {
                        if (tourStep !== null) finishTour(false);
                        openBlockFromCard(realIdx, e.currentTarget);
                      }}
                    >
                      {isTourTargetCard && (
                        <div className="tour-card-pointer-badge" aria-hidden="true">
                          {TOUR_STEPS[(tourStep || 2) - 1]?.pointerText || '👆 Comece por esta 1ª Etapa'}
                        </div>
                      )}
                      <div className="card-glow" />
                      <div
                        className={`card-art ${status}`}
                        style={{ ['--art-progress' as any]: pct / 100 } as React.CSSProperties}
                        aria-hidden="true"
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}${(b as any).art || `cards/stage-${String(realIdx + 1).padStart(2, '0')}.webp`}`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={640}
                          height={360}
                        />
                      </div>
                      <div>
                        <div className="card-top">
                          <div className="card-icon-box">
                            <CardIcon size={22} strokeWidth={1.8} />
                          </div>
                          <div className="card-top-right">
                            <span className={`status-badge ${status}`}>{statusLabel}</span>
                            <button
                              type="button"
                              className="quick-complete-btn"
                              title="Marcar/testar conclusão GSAP desta etapa"
                              aria-label={`Alternar conclusão de ${b.title}`}
                              onClick={e => {
                                e.stopPropagation();
                                const cardEl = document.getElementById(`stage-card-${realIdx}`);
                                if (status !== 'completed') {
                                  spawnCompletionParticles(cardEl);
                                }
                                p.onToggleDemoBlockComplete(realIdx);
                              }}
                            >
                              <Check size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="card-body-copy">
                          <div className="card-step-label">
                            Etapa {b.number} de {data.blocks.length} • ~{b.estimatedMinutes} min
                          </div>
                          <h3 className="card-title">{b.title}</h3>
                          <p className="card-desc">{b.intro}</p>
                        </div>
                      </div>

                      <div>
                        <div className="card-progress-wrap">
                          <div className="card-progress-meta">
                            <span>
                              {ansCount} de {total} questões
                            </span>
                            <span className="card-pct-number">{pct}%</span>
                          </div>
                          <div className="card-progress-bar">
                            <div className="card-progress-fill" data-target-pct={pct} style={{ width: `${pct}%` }} />
                          </div>
                        </div>

                        <button type="button" className="card-cta">
                          <span className="card-cta-label">{ctaText}</span>
                          <span className="card-cta-arrow">
                            <ArrowRight size={15} />
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {tourStep !== null && TOUR_STEPS[tourStep - 1] && (
                <div
                  className="tour-balloon-dock"
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby="tour-balloon-title"
                >
                  <div className="tour-popup-balloon" ref={tourBalloonRef}>
                    <div className="tour-balloon-top">
                      <span className="tour-step-pill">{TOUR_STEPS[tourStep - 1].tag}</span>
                      <div className="tour-dots" aria-hidden="true">
                        {[1, 2, 3, 4].map(n => (
                          <span
                            key={n}
                            className={'tour-dot ' + (n === tourStep ? 'active' : n < tourStep ? 'done' : '')}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="tour-close-x"
                        onClick={() => finishTour(false)}
                        aria-label="Fechar explicação"
                        title="Fechar explicação"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <h3 id="tour-balloon-title" className="tour-balloon-title">
                      {TOUR_STEPS[tourStep - 1].title}
                    </h3>
                    <p className="tour-balloon-body">{TOUR_STEPS[tourStep - 1].body}</p>

                    <div className="tour-balloon-actions">
                      <button type="button" className="tour-skip-btn" onClick={() => finishTour(false)}>
                        Pular explicação
                      </button>
                      <div className="tour-nav-btns">
                        {tourStep > 1 && (
                          <button
                            type="button"
                            className="button secondary tour-btn-prev"
                            onClick={() => setTourStep(tourStep - 1)}
                          >
                            <ArrowLeft size={16} />
                            <span>Anterior</span>
                          </button>
                        )}
                        {tourStep < 4 ? (
                          <button
                            type="button"
                            className="button primary tour-btn-next"
                            onClick={() => setTourStep(tourStep + 1)}
                          >
                            <span>Próximo ({tourStep}/4)</span>
                            <ArrowRight size={16} />
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="button secondary tour-btn-prev"
                              onClick={() => finishTour(false)}
                            >
                              <span>Ficar no Painel</span>
                            </button>
                            <button
                              type="button"
                              className="button primary tour-btn-next"
                              onClick={() => finishTour(true)}
                            >
                              <span>Começar Etapa 1 Agora</span>
                              <ArrowRight size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: FORMULÁRIO DE PERGUNTAS */}
        {p.subView === 'form' && (
          <>
            <div className="question-viewport">
              <div className="question-content" data-kind={p.question.type} ref={ref}>
                <nav className="question-breadcrumb" aria-label="Você está em">
                  <span className="block-symbol">
                    <Icon strokeWidth={1.6} />
                  </span>
                  <ol>
                    <li>
                      <button type="button" onClick={() => p.onChangeSubView('cards')}>
                        Etapa {currentBlockIdx + 1} de {data.blocks.length}
                      </button>
                    </li>
                    <li aria-hidden="true" className="crumb-sep">
                      <ChevronRight size={14} />
                    </li>
                    <li>
                      <button type="button" onClick={() => p.onBlock(currentBlockIdx)}>
                        {block.title}
                      </button>
                    </li>
                    {p.question.page && p.question.page !== block.title && (
                      <>
                        <li aria-hidden="true" className="crumb-sep">
                          <ChevronRight size={14} />
                        </li>
                        <li aria-current="page">{p.question.page}</li>
                      </>
                    )}
                  </ol>
                </nav>

                {block.introWarning && position === 1 && (
                  <div className="block-intro-warning" role="note">
                    <AlertCircle size={20} />
                    <p>{block.introWarning}</p>
                  </div>
                )}

                <h1 ref={title} tabIndex={-1} className="sr-only">
                  {p.question.label}
                </h1>

                {p.editable ? (
                  <form
                    id="survey-form"
                    noValidate
                    onSubmit={e => {
                      e.preventDefault();
                      direction.current = 1;
                      p.onNext();
                    }}
                  >
                    {p.field}
                  </form>
                ) : (
                  <div className="locked-state">
                    <ShieldCheck />
                    <h2>Inscrição enviada</h2>
                    <p>Acompanhe a análise e consulte suas respostas no resumo.</p>
                    <button className="button primary" onClick={p.onReview}>
                      Consultar respostas
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="survey-bottom">
              <div className="survey-bottom-inner">
                <div className="survey-progress-label">
                  <span>
                    Pergunta {position} de {blockQs.length} nesta etapa ({block.title})
                  </span>
                  <span>{p.percent}% do total preenchido</span>
                </div>
                <progress value={p.percent} max={100} aria-label="Progresso de preenchimento" />
                <div className="survey-controls">
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => {
                      direction.current = -1;
                      p.onBack();
                    }}
                  >
                    <ArrowLeft />
                    Voltar
                  </button>
                  <button type="button" className="summary-link" onClick={() => p.onChangeSubView('cards')}>
                    Painel
                  </button>
                  <button className="button primary" type="submit" form="survey-form" disabled={!p.editable}>
                    {isLastInBlock ? 'Concluir Etapa' : 'Continuar'}
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VIEW 3: TELA DE PARABÉNS PERSONALIZADA AO FINAL DE CADA ETAPA */}
        {p.subView === 'celebration' && (
          <div className="question-viewport celebration-viewport">
            <div className="celebration-card" ref={celebBoxRef}>
              <div className="celeb-art" aria-hidden="true">
                <img
                  src={`${import.meta.env.BASE_URL}${(block as any).art || `cards/stage-${String(currentBlockIdx + 1).padStart(2, '0')}.webp`}`}
                  alt=""
                  width={640}
                  height={360}
                />
              </div>
              <div className="celeb-icon-ring">
                <Icon size={28} strokeWidth={1.8} />
                <div className="celeb-check-badge">
                  <Check size={13} strokeWidth={2.5} />
                </div>
              </div>

              <span className="celeb-step-tag">
                Etapa {block.number} de {data.blocks.length} Concluída • {doneBlocksCount}/{data.blocks.length} Completas
              </span>

              <h2 className="celeb-title">{block.celebration.title}</h2>
              <p className="celeb-copy">“{block.celebration.copy}”</p>

              {nextBlockMeta ? (
                <div className="next-stage-preview">
                  <div className="next-stage-left">
                    <div className="card-icon-box" style={{ width: 38, height: 38 }}>
                      <NextBlockIcon size={18} />
                    </div>
                    <div>
                      <small>Próxima Etapa Sugerida</small>
                      <strong>
                        Etapa {nextBlockMeta.number}: {nextBlockMeta.title}
                      </strong>
                    </div>
                  </div>
                  <span className="next-stage-count">{nextBlockQsCount} questões</span>
                </div>
              ) : (
                <div className="next-stage-preview">
                  <div className="next-stage-left">
                    <div className="card-icon-box" style={{ width: 38, height: 38 }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <small>Jornada Completa</small>
                      <strong>Revisão final e envio do diagnóstico</strong>
                    </div>
                  </div>
                  <span className="next-stage-count">100%</span>
                </div>
              )}

              <div className="celeb-actions">
                <button
                  type="button"
                  className="button secondary celeb-secondary-btn"
                  onClick={() => p.onChangeSubView('cards')}
                >
                  <LayoutGrid size={16} />
                  <span>Painel</span>
                </button>

                {nextBlockMeta ? (
                  <button
                    type="button"
                    className="button primary celeb-primary-btn"
                    onClick={() => {
                      p.onBlock(currentBlockIdx + 1);
                      p.onChangeSubView('form');
                    }}
                  >
                    <span>Avançar</span>
                    <ArrowRight size={17} />
                  </button>
                ) : (
                  <button type="button" className="button primary celeb-primary-btn" onClick={p.onReview}>
                    <span>Avançar</span>
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>

              <button type="button" className="celeb-csv-link" onClick={p.onReview}>
                <FileSpreadsheet size={15} />
                <span>Ver relatório e exportar .CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {clearAlert && (
        <div
          className="clear-alert-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-alert-title"
          onKeyDown={e => {
            if (e.key === 'Escape') setClearAlert(false);
          }}
        >
          <div className="clear-alert-balloon">
            <div className="clear-alert-icon">
              <AlertCircle size={26} />
            </div>
            <h3 id="clear-alert-title">Deseja apagar e recomeçar a pesquisa?</h3>
            <p>
              Você irá começar novamente toda a pesquisa do zero. Tem certeza que deseja apagar todas as respostas
              preenchidas até agora?
            </p>
            <div className="clear-alert-actions">
              <button
                type="button"
                className="button primary clear-return-btn"
                autoFocus
                onClick={() => setClearAlert(false)}
              >
                Retornar
              </button>
              <button
                type="button"
                className="button secondary clear-confirm-btn"
                onClick={() => {
                  setClearAlert(false);
                  p.onResetSurvey?.();
                }}
              >
                Sim, quero recomeçar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

