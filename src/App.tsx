import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronDown,
  ClipboardCheck,
  Coins,
  Download,
  Eye,
  FileCheck2,
  FileText,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react'
import { ContactPage } from './components/ContactPage'

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  id: string
  name: string
  displayName: string
  cardRole: string
  role: string
  badge: string
  caption: string
  avatar: string
  bioIntro: string
  sections: { title?: string; text: string }[]
}

const teamMembers: TeamMember[] = [
  {
    id: 'patricia',
    name: 'Patrícia Neves Galheigo',
    displayName: 'Patrícia Galheigo',
    cardRole: 'Operação',
    role: 'Psicóloga',
    badge: 'Operação',
    caption: 'Patrícia — Operação',
    avatar: '/v4/patricia-operacoes-netdobem.webp',
    bioIntro:
      'Psicóloga formada pela Universidade Católica de Petrópolis desde 1998, Patrícia Neves Galheigo reúne uma trajetória de mais de duas décadas dedicada ao desenvolvimento humano, integrando sólida experiência em gestão de pessoas e atuação clínica.',
    sections: [
      {
        title: 'Experiência em Desenvolvimento Humano e Organizacional',
        text: 'Durante 18 anos exerceu a função de Coordenadora de Recursos Humanos em empresa de grande porte, liderando projetos de Desenvolvimento Humano e Organizacional (DHO), com foco na formação de lideranças, desenvolvimento de equipes, gestão de desempenho, treinamento, clima organizacional, mediação de conflitos e fortalecimento da cultura institucional. Essa vivência consolidou competências na estruturação de processos, desenvolvimento de pessoas e promoção de ambientes organizacionais mais saudáveis e eficientes.',
      },
      {
        title: 'Atuação Clínica',
        text: 'Há 7 anos atua como psicóloga clínica, realizando atendimento psicoterapêutico a crianças, adolescentes, adultos e idosos. Sua experiência no acompanhamento de crianças e adolescentes motivou sua especialização em Análise do Comportamento Aplicada (ABA), ampliando sua capacidade de contribuir com intervenções fundamentadas em evidências científicas, especialmente nos desafios relacionados ao desenvolvimento infantil, comportamento e aprendizagem.',
      },
    ],
  },
  {
    id: 'agda',
    name: 'Agda Cecília de Pontes Ximenes',
    displayName: 'Agda Ximenes',
    cardRole: 'Estratégia',
    role: 'Assistente Social',
    badge: 'Estratégia',
    caption: 'Agda — Estratégia',
    avatar: '/v4/agda-estrategia-net-do-bem.webp',
    bioIntro:
      'Assistente Social, com trajetória consolidada nas áreas de Gestão Pública, Proteção Social Especial, Saúde e Terceiro Setor. Atua há mais de uma década no SUAS, com experiência em gestão de equipes, coordenação de serviços de alta complexidade, Casa Lar, CREAS, monitoramento e avaliação de parcerias, elaboração de projetos e capacitação de profissionais e organizações.',
    sections: [
      {
        text: 'Possui Pós-Graduação em Gestão Hospitalar, ampliando sua atuação na interface entre gestão, políticas públicas, saúde e proteção social.',
      },
      {
        text: 'Sua experiência reúne gestão estratégica, liderança de equipes, assessoria técnica, formação profissional e articulação da rede de serviços, com atuação pautada na qualificação das políticas públicas e no fortalecimento das equipes que executam os serviços socioassistenciais.',
      },
    ],
  },
  {
    id: 'andre',
    name: 'André Facciolli',
    displayName: 'Andre Facciolli',
    cardRole: 'Fundador',
    role: 'Fundador da Fundação Net do Bem',
    badge: 'Fundador',
    caption: 'André — Fundador',
    avatar: '/v4/founder-net-do-bem.webp',
    bioIntro:
      'André Facciolli é empresário, empreendedor e fundador da Fundação Net do Bem, iniciativa criada com o propósito de contribuir para a proteção, o desenvolvimento e a construção de novas oportunidades para crianças e adolescentes em situação de vulnerabilidade.',
    sections: [
      {
        text: 'Formado em Ciência da Computação e com mestrado em Administração, construiu uma trajetória profissional de mais de 30 anos na área de tecnologia. Em 2003, fundou a Netbr, empresa brasileira especializada em Gestão de Identidades e Acessos, onde atua como CEO. Ao longo dessa jornada, liderou o crescimento da empresa, a formação de equipes especializadas e projetos de tecnologia para algumas das maiores organizações do Brasil.',
      },
      {
        text: 'Com o passar dos anos, o desejo de transformar parte dessa experiência empresarial em impacto social ganhou forma. A Fundação Net do Bem nasce dessa decisão: colocar capacidade de gestão, tecnologia, relacionamento e mobilização de recursos a serviço de uma causa maior.',
      },
      {
        text: 'André acredita que toda criança deve ter a oportunidade de crescer em um ambiente de proteção, afeto, educação e perspectiva de futuro. Por meio da Fundação Net do Bem, busca aproximar empresas, profissionais, organizações sociais e poder público para fortalecer a rede de proteção à infância, especialmente as instituições e pessoas que atuam diretamente com crianças e adolescentes em acolhimento.',
      },
      {
        text: 'Mais do que realizar ações pontuais, sua visão para a Fundação é construir uma organização capaz de gerar impacto de longo prazo, apoiando projetos, capacitando equipes, mobilizando recursos e contribuindo para o aprimoramento das políticas e práticas de proteção à infância.',
      },
      {
        text: 'Para André, fazer o bem também exige organização, compromisso e continuidade. É dessa convicção que nasce a Fundação Net do Bem.',
      },
    ],
  },
]

const purposeCards = [
  {
    id: 'objetivo',
    icon: Target,
    label: 'Objetivo',
    title: 'Fortalecer organizações que protegem a infância.',
    tone: 'objective',
    text: 'Apoiar entidades que acolhem crianças e adolescentes em situação de vulnerabilidade, ampliando a garantia dos direitos previstos no ECA.',
  },
  {
    id: 'missao',
    icon: HeartHandshake,
    label: 'Missão',
    title: 'Transformar cuidado em capacidade institucional.',
    tone: 'mission',
    text: 'Mobilizar e apoiar na gestão de recursos, parcerias e sociedade, de forma transparente e eficiente, para fortalecer instituições que promovem a proteção, o desenvolvimento e a inclusão de crianças em situação de vulnerabilidade, contribuindo para a construção de oportunidades e de um futuro mais digno.',
  },
  {
    id: 'visao',
    icon: Eye,
    label: 'Visão',
    title: 'Uma rede de referência, proteção e oportunidades.',
    tone: 'vision',
    text: 'Consolidar uma atuação reconhecida pela captação e gestão responsável de recursos, fortalecendo organizações para que toda criança tenha acesso a acolhimento, educação, saúde e pleno desenvolvimento.',
  },
  {
    id: 'valores',
    icon: ShieldCheck,
    label: 'Valores',
    title: 'Compromisso com a infância',
    tone: 'values',
    bullets: [
      'Priorizar o bem-estar, a proteção e o desenvolvimento integral das crianças.',
      'Transparência: Garantir clareza e responsabilidade na gestão e destinação dos recursos.',
      'Ética: Atuar com integridade em todas as relações e decisões.',
      'Solidariedade: Incentivar a participação da sociedade na promoção de mudanças positivas.',
      'Respeito e dignidade: Reconhecer e valorizar cada criança como sujeito de direitos.',
      'Impacto social: Buscar resultados concretos e sustentáveis para as comunidades atendidas.',
      'Colaboração: Construir parcerias estratégicas com instituições, empresas, governos e cidadãos.',
      'Inovação: Desenvolver soluções criativas para ampliar a captação de recursos e o alcance dos projetos.',
      'Governança: Suportar as Casas de Acolhimento para operarem de forma mais efetiva.',
    ],
  },
]

const pillars = [
  {
    title: 'Pesquisa e conhecimento',
    text: 'Mapeamos a realidade para transformar necessidades em decisões melhores e orientar investimentos responsáveis.',
    icon: '/v2/icons/search.webp',
    tone: 'coral',
  },
  {
    title: 'Capacitação e gestão',
    text: 'Desenvolvemos lideranças, processos, planejamento, governança e sustentabilidade institucional.',
    icon: '/v2/icons/book.webp',
    tone: 'purple',
  },
  {
    title: 'Aceleração de organizações',
    text: 'Construímos planos de desenvolvimento e acompanhamos sua implantação com metas e indicadores.',
    icon: '/v2/icons/casa-decolar.webp',
    tone: 'yellow',
  },
  {
    title: 'Articulação e advocacy',
    text: 'Conectamos organizações, empresas, especialistas, conselhos e poder público em torno da infância.',
    icon: '/v2/icons/parcerias.webp',
    tone: 'mint',
  },
]

const journey = [
  ['Escutar', 'Diagnóstico da realidade institucional, financeira, operacional e de governança.'],
  ['Planejar', 'Metas, prioridades e indicadores construídos junto com cada organização apoiada.'],
  ['Fortalecer', 'Capacitação, mentoria e consultoria aplicadas à rotina e aos desafios reais.'],
  ['Conectar', 'Parcerias, conhecimento e recursos para sustentar transformações duradouras.'],
]

const impactMetrics = [
  {
    label: 'Organizações fortalecidas',
    icon: Building2,
  },
  {
    label: 'Profissionais capacitados',
    icon: GraduationCap,
  },
  {
    label: 'Planos de melhoria implantados',
    icon: ClipboardCheck,
  },
  {
    label: 'Recursos mobilizados',
    icon: Coins,
  },
]

interface TransparencyTopic {
  title: string
  text: string
  docs?: { label: string; href: string }[]
  ctaLabel?: string
}

const transparencyTopics: TransparencyTopic[] = [
  {
    title: 'Institucional',
    text: 'Ata de constituição, estatuto social, CNPJ e composição da governança.',
    docs: [
      {
        label: 'Ata de Constituição (PDF)',
        href: '/v5/documentos/institucional-ata-constituicao.pdf',
      },
      {
        label: 'Estatuto Social (PDF)',
        href: '/v5/documentos/institucional-estatuto-social.pdf',
      },
      {
        label: 'Comprovante de CNPJ (PDF)',
        href: '/v5/documentos/institucional-cartao-cnpj.pdf',
      },
    ],
  },
  {
    title: 'Planejamento',
    text: 'Plano estratégico, plano anual de atividades, metas e indicadores.',
    docs: [
      {
        label: 'Plano Estratégico Institucional (PDF)',
        href: '/v5/documentos/planejamento-plano-estrategico.pdf',
      },
    ],
  },
  {
    title: 'Integridade',
    text: 'Código de ética, políticas institucionais, proteção à infância e canal de denúncias.',
    ctaLabel: 'Canal de integridade e contato',
  },
]

const menuSections: [string, string][] = [
  ['Quem somos', '#quem-somos'],
  ['Como atuamos', '#como-atuamos'],
  ['Impacto', '#impacto'],
  ['Transparência', '#transparencia'],
  ['Contato', '/contato'],
]

function isContactPath(pathname: string, hash: string) {
  return pathname.startsWith('/contato') || pathname.startsWith('/doar') || hash === '#contato-pagina'
}

function BrandLogo({
  inverse = false,
  onClickHome,
}: {
  inverse?: boolean
  onClickHome?: (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <a className="brand-logo" href="#inicio" onClick={onClickHome} aria-label="Fundação Net do Bem — início">
      <img src={inverse ? '/v3/brand/logo-white.svg' : '/v3/brand/logo-green.svg'} alt="Fundação Net do Bem" />
    </a>
  )
}

function App() {
  const app = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'contact'>(() =>
    isContactPath(window.location.pathname, window.location.hash) ? 'contact' : 'home',
  )

  // Team Member Carousel & Modal State
  const [activeTeamIndex, setActiveTeamIndex] = useState(0)
  const [isTeamHovered, setIsTeamHovered] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Purpose Expandable Cards State
  const [expandedPurpose, setExpandedPurpose] = useState<string | null>('objetivo')

  useEffect(() => {
    const onPopState = () => {
      setCurrentView(isContactPath(window.location.pathname, window.location.hash) ? 'contact' : 'home')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openContactPage = (e?: MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault()
    setMenuOpen(false)
    if (window.location.pathname !== '/contato') {
      window.history.pushState({}, '', '/contato')
    }
    setCurrentView('contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToSection = (sectionHash: string, e?: MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault()
    setMenuOpen(false)
    if (currentView !== 'home') {
      window.history.pushState({}, '', `/${sectionHash}`)
      setCurrentView('home')
      setTimeout(() => {
        ScrollTrigger.refresh()
        document.querySelector(sectionHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    } else {
      window.history.pushState({}, '', sectionHash)
      document.querySelector(sectionHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goBackHome = () => {
    window.history.pushState({}, '', '/')
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Auto rotation for Team Members carousel (pauses on hover or modal open)
  useEffect(() => {
    if (currentView !== 'home' || isTeamHovered || selectedMember !== null) return
    const interval = setInterval(() => {
      setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [currentView, isTeamHovered, selectedMember])

  // ESC Key listener to close Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null)
    }
    if (selectedMember) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedMember])

  useEffect(() => {
    const enableVideo = () => setLoadVideo(true)
    if (document.readyState === 'complete') enableVideo()
    else window.addEventListener('load', enableVideo, { once: true })
    return () => window.removeEventListener('load', enableVideo)
  }, [])

  useEffect(() => {
    if (currentView !== 'home') return
    const selector = window.location.hash
    if (!selector || selector === '#contato-pagina') return
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
      document.querySelector(selector)?.scrollIntoView({ block: 'start' })
    }, 450)
    return () => window.clearTimeout(timer)
  }, [currentView])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  useLayoutEffect(() => {
    if (currentView !== 'home') return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          animate: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
          mobile: '(max-width: 899px)',
        },
        ({ conditions }) => {
          const { animate, desktop } = conditions as { animate: boolean; desktop: boolean; mobile: boolean }
          if (!animate) return
          const cardCleanups: Array<() => void> = []

          const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
          heroTimeline
            .from('.hero__eyebrow', { autoAlpha: 0, y: 22, duration: 0.65 })
            .from('.hero__title-line', { autoAlpha: 0, yPercent: 85, rotate: 2, stagger: 0.1, duration: 0.85 }, '-=.35')
            .from('.hero__lead, .hero__actions', { autoAlpha: 0, y: 28, stagger: 0.09, duration: 0.7 }, '-=.45')
            .from('.hero__media-shell', { autoAlpha: 0, scale: 0.92, rotate: 1.5, duration: 1.1 }, '-=.95')

          const supportCta = document.querySelector<HTMLElement>('.hero__support-cta')
          if (supportCta) {
            const onSupportClick = () => {
              gsap.killTweensOf(supportCta)
              gsap.timeline()
                .to(supportCta, { scale: 0.93, duration: 0.1, ease: 'power2.in' })
                .to(supportCta, { scale: 1, duration: 0.62, ease: 'elastic.out(1, .45)', clearProps: 'transform' })
            }
            supportCta.addEventListener('click', onSupportClick)
            cardCleanups.push(() => {
              supportCta.removeEventListener('click', onSupportClick)
              gsap.killTweensOf(supportCta)
            })
          }

          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: desktop ? 54 : 34,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 86%', once: true },
            })
          })

          gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach((element) => {
            gsap.from(element, {
              clipPath: 'inset(12% 12% 12% 12% round 36px)',
              scale: 1.08,
              duration: 1.15,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 82%', once: true },
            })
          })

          if (desktop) {
            const heroTransition = gsap.timeline({
              scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            })
            heroTransition
              .to('.hero__media-layer', { yPercent: 11, scale: 1.12, ease: 'none' }, 0)
              .to('.hero__copy', { yPercent: -16, autoAlpha: 0.08, ease: 'none' }, 0)
              .to('.hero__transition-curtain', { scaleY: 1, ease: 'none' }, 0.42)

            gsap.to('.site-header__inner', {
              minHeight: 66,
              scrollTrigger: { trigger: 'body', start: '80px top', end: '180px top', scrub: 0.4 },
            })

            document.querySelectorAll<HTMLElement>('.interactive-card').forEach((card) => {
              gsap.set(card, { transformPerspective: 900, transformOrigin: 'center' })
              const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.45, ease: 'power3.out' })
              const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.45, ease: 'power3.out' })

              const onMove = (event: PointerEvent) => {
                const bounds = card.getBoundingClientRect()
                const x = event.clientX - bounds.left
                const y = event.clientY - bounds.top
                rotateX(((y / bounds.height) - 0.5) * -5)
                rotateY(((x / bounds.width) - 0.5) * 5)
                card.style.setProperty('--pointer-x', `${x}px`)
                card.style.setProperty('--pointer-y', `${y}px`)
              }
              const onLeave = () => {
                rotateX(0)
                rotateY(0)
              }
              card.addEventListener('pointermove', onMove)
              card.addEventListener('pointerleave', onLeave)
              cardCleanups.push(() => {
                card.removeEventListener('pointermove', onMove)
                card.removeEventListener('pointerleave', onLeave)
              })
            })
          }

          gsap.fromTo(
            '.footer__heart',
            { yPercent: 28, scale: 0.9 },
            {
              yPercent: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 1 },
            },
          )

          return () => cardCleanups.forEach((cleanup) => cleanup())
        },
      )

      return () => media.revert()
    }, app)
    return () => context.revert()
  }, [currentView])

  const currentMember = teamMembers[activeTeamIndex]

  return (
    <div ref={app}>
      <header className={`site-header ${menuOpen ? 'site-header--menu-open' : ''}`}>
        <div className="container site-header__inner">
          <BrandLogo inverse={menuOpen} onClickHome={(e) => navigateToSection('#inicio', e)} />
          <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Navegação principal">
            <span className="nav__overline">Explore a Fundação</span>
            <a style={{ '--order': 1 } as CSSProperties} href="#quem-somos" onClick={(e) => navigateToSection('#quem-somos', e)}>
              Quem somos
            </a>
            <a style={{ '--order': 2 } as CSSProperties} href="#como-atuamos" onClick={(e) => navigateToSection('#como-atuamos', e)}>
              Como atuamos
            </a>
            <a style={{ '--order': 3 } as CSSProperties} href="#impacto" onClick={(e) => navigateToSection('#impacto', e)}>
              Impacto
            </a>
            <a style={{ '--order': 4 } as CSSProperties} href="#transparencia" onClick={(e) => navigateToSection('#transparencia', e)}>
              Transparência
            </a>
            <a style={{ '--order': 5 } as CSSProperties} href="/contato" onClick={openContactPage}>
              Contato
            </a>
            <a style={{ '--order': 6 } as CSSProperties} className="nav__donate" href="/contato" onClick={openContactPage}>
              Quero ajudar <ArrowRight size={18} />
            </a>
            <div className="nav__mobile-footer">
              Sorocaba — SP <span>•</span> Fundação Net do Bem
            </div>
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={31} strokeWidth={2.8} /> : <Menu size={31} strokeWidth={2.8} />}
          </button>
        </div>
      </header>

      {currentView === 'contact' ? (
        <main id="conteudo">
          <ContactPage onBackHome={goBackHome} />
        </main>
      ) : (
        <main id="conteudo">
          {/* HERO SECTION */}
          <section className="hero" id="inicio">
            <div className="hero__wash hero__wash--yellow" />
            <div className="hero__wash hero__wash--mint" />
            <div className="container hero__grid">
              <div className="hero__copy">
                <div className="hero__eyebrow">
                  <span /> Uma rede de cuidado que transforma
                </div>
                <h1>
                  <span className="hero__title-mask">
                    <span className="hero__title-line">Fortalecemos</span>
                  </span>
                  <span className="hero__title-mask">
                    <span className="hero__title-line">
                      quem <span className="hero__inline-accent">protege a</span>
                    </span>
                  </span>
                  <span className="hero__title-mask">
                    <span className="hero__title-line hero__title-line--accent">infância.</span>
                  </span>
                </h1>
                <p className="hero__lead">
                  Apoiamos casas de acolhimento e organizações sociais para que atuem com mais estrutura, governança,
                  transparência e impacto.
                </p>
                <div className="hero__actions">
                  <a className="button button--secondary" href="#como-atuamos" onClick={(e) => navigateToSection('#como-atuamos', e)}>
                    Conheça nosso trabalho <ArrowRight size={20} />
                  </a>
                  <a className="button button--primary hero__support-cta" href="/contato" onClick={openContactPage}>
                    Apoiar a Fundação <HandHeart size={20} />
                  </a>
                </div>
              </div>

              <div className="hero__media-shell" aria-label="Coração em rede conectando pessoas e organizações">
                <div className="hero__media-layer">
                  <img
                    className="hero__poster"
                    src="/v2/images/network-heart.png"
                    alt="Pessoas construindo uma rede de cuidado ao redor de um coração"
                  />
                  {loadVideo && (
                    <video
                      className={videoReady ? 'is-ready' : ''}
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="metadata"
                      onCanPlay={() => setVideoReady(true)}
                      aria-hidden="true"
                    >
                      <source src="/v2/media/hero.mp4" type="video/mp4" />
                    </video>
                  )}
                </div>
                <span className="hero__sticker hero__sticker--top">conexão</span>
                <span className="hero__sticker hero__sticker--bottom">
                  <span className="hero__sticker-icon" aria-hidden="true" /> cuidado em rede
                </span>
              </div>
              <div className="hero__transition-curtain" aria-hidden="true" />
            </div>
          </section>

          {/* NOSSA HISTÓRIA & EQUIPE */}
          <section className="story section" id="quem-somos">
            <div className="container story__grid">
              <div className="section-index" data-reveal>
                Nossa história
              </div>
              <div className="story__content">
                <h2 data-reveal>Um sonho grande que começa fortalecendo quem já faz a diferença.</h2>
                <div className="story__body" data-reveal>
                  <p>
                    A Fundação Net do Bem nasceu em <strong>26 de novembro de 2025</strong>, em Sorocaba, com o desejo
                    de deixar um legado e devolver à sociedade parte do que foi conquistado ao longo da vida.
                  </p>
                  <p>
                    A experiência prática com casas de acolhimento mostrou que muitas organizações realizam um trabalho
                    essencial, mas enfrentam dificuldades de gestão, estrutura, governança, captação e
                    sustentabilidade.
                  </p>
                  <p>
                    A Fundação assessora e fortalece as organizações responsáveis pelo acolhimento por meio de
                    pesquisa, capacitação, consultoria, advocacy e mobilização de recursos.
                  </p>
                </div>
              </div>

              {/* CARROSSEL AUTOMÁTICO DE COLABORADORES */}
              <div
                className="team-carousel"
                data-image-reveal
                onMouseEnter={() => setIsTeamHovered(true)}
                onMouseLeave={() => setIsTeamHovered(false)}
              >
                <div
                  className="team-carousel__card"
                  onClick={() => setSelectedMember(currentMember)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedMember(currentMember)
                  }}
                  aria-label={`Ver mini currículo de ${currentMember.name}`}
                >
                  <div className="team-carousel__frame">
                    <img
                      key={currentMember.id}
                      src={currentMember.avatar}
                      alt={`Avatar de ${currentMember.name}`}
                      className="team-carousel__avatar"
                    />
                    <span className="team-carousel__badge">{currentMember.badge}</span>
                  </div>
                  <figcaption className="team-carousel__caption">
                    <div>
                      <strong>{currentMember.displayName}</strong>
                      <span>{currentMember.cardRole}</span>
                    </div>
                    <span className="team-carousel__hint">
                      BIO <ArrowRight size={14} />
                    </span>
                  </figcaption>
                </div>

                {/* NAV CONTROLS & THUMBNAILS */}
                <div className="team-carousel__nav">
                  <div className="team-carousel__thumbs">
                    {teamMembers.map((member, idx) => (
                      <button
                        key={member.id}
                        type="button"
                        className={`team-carousel__thumb ${activeTeamIndex === idx ? 'is-active' : ''}`}
                        onClick={() => setActiveTeamIndex(idx)}
                        aria-label={`Selecionar ${member.name}`}
                      >
                        <img src={member.avatar} alt="" />
                      </button>
                    ))}
                  </div>
                  <div className="team-carousel__arrows">
                    <button
                      type="button"
                      onClick={() => setActiveTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)}
                      aria-label="Colaborador anterior"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length)}
                      aria-label="Próximo colaborador"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROPÓSITO INSTITUCIONAL (4 CARDS EXPANSIVOS) */}
          <section className="purpose section" id="proposito">
            <div className="container">
              <div className="purpose__heading" data-reveal>
                <span className="section-index">Propósito institucional</span>
                <h2>
                  Missão clara.
                  <br />
                  Visão compartilhada.
                  <br />
                  Impacto sustentável.
                </h2>
              </div>
              <div className="purpose__layout">
                <figure className="purpose__visual" data-image-reveal>
                  <img
                    src="/v3/images/proposito-institucional.webp"
                    alt="Equipe em massinha conectando gestão, conhecimento e cuidado ao redor de uma casa"
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>Cuidado que ganha estrutura.</strong>
                    <span>Conhecimento, articulação e gestão trabalhando em rede.</span>
                  </figcaption>
                </figure>

                <div className="purpose__grid">
                  {purposeCards.map((card) => {
                    const Icon = card.icon
                    const isExpanded = expandedPurpose === card.id
                    return (
                      <article
                        key={card.id}
                        className={`purpose-card purpose-card--${card.tone} ${isExpanded ? 'is-expanded' : ''}`}
                        onMouseEnter={() => setExpandedPurpose(card.id)}
                        onClick={() => setExpandedPurpose(isExpanded ? null : card.id)}
                        data-reveal
                      >
                        <div className="purpose-card__top">
                          <div className="purpose-card__label">
                            <Icon />
                            <span>{card.label}</span>
                          </div>
                          <button
                            type="button"
                            className="purpose-card__chevron-btn"
                            aria-label={isExpanded ? 'Recolher card' : 'Expandir card'}
                            aria-expanded={isExpanded}
                          >
                            <ChevronDown className={`purpose-card__chevron ${isExpanded ? 'is-rotated' : ''}`} size={20} />
                          </button>
                        </div>

                        <div className="purpose-card__body">
                          <h3>{card.title}</h3>
                          <div className="purpose-card__expand-content">
                            {card.text && <p>{card.text}</p>}
                            {card.bullets && (
                              <ul className="purpose-card__bullets">
                                {card.bullets.map((bullet, idx) => {
                                  const parts = bullet.split(': ')
                                  return (
                                    <li key={idx}>
                                      {parts.length > 1 ? (
                                        <>
                                          <strong>{parts[0]}:</strong> {parts.slice(1).join(': ')}
                                        </>
                                      ) : (
                                        bullet
                                      )}
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* COMO ATUAMOS */}
          <section className="pillars section" id="como-atuamos">
            <div className="container">
              <div className="section-heading" data-reveal>
                <div>
                  <span className="section-index">Como atuamos</span>
                  <h2>Uma rede fica mais forte quando o conhecimento circula.</h2>
                </div>
                <p>Transformamos desafios de gestão em caminhos possíveis, respeitando a realidade de cada organização.</p>
              </div>
              <div className="pillars__grid">
                {pillars.map(({ title, text, icon, tone }) => (
                  <article className={`pillar-card pillar-card--${tone} interactive-card`} key={title} data-reveal>
                    <div className="card-glow" />
                    <div className="pillar-card__top pillar-card__top--icon-only">
                      <img src={icon} alt="" />
                    </div>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <figure className="wide-scene" data-image-reveal>
                <img src="/v2/images/scene-planning.webp" alt="Profissionais em massinha construindo um plano de desenvolvimento" />
                <figcaption>
                  <strong>Da estratégia à prática.</strong>
                  <span>Planejamento construído junto com quem conhece a realidade.</span>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* A JORNADA */}
          <section className="journey section" id="jornada">
            <div className="container journey__grid">
              <div className="journey__visual" data-image-reveal>
                <img src="/v2/images/scene-capacity.webp" alt="Capacitação em massinha com profissionais analisando indicadores" />
                <div className="journey__badge">
                  <img src="/v2/icons/crescimento.webp" alt="" />
                  <span>Conhecimento que vira capacidade.</span>
                </div>
              </div>
              <div className="journey__content" data-reveal>
                <span className="section-index">A jornada</span>
                <h2>Da escuta à transformação sustentável.</h2>
                <div className="journey__steps">
                  {journey.map(([title, text]) => (
                    <div className="journey__step journey__step--clean" key={title}>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* IMPACTO EM CONSTRUÇÃO */}
          <section className="impact section" id="impacto">
            <div className="container" data-reveal>
              <div className="impact__card">
                <div className="impact__copy">
                  <span className="section-index section-index--light">Impacto em construção</span>
                  <h2>
                    Medir para aprender.
                    <br />
                    Aprender para ampliar.
                  </h2>
                  <p>
                    Nossa primeira base de impacto está sendo construída com indicadores responsáveis — sem promessas
                    vazias e sem confundir alcance direto com benefício indireto.
                  </p>
                  <a className="button button--light" href="/contato" onClick={openContactPage}>
                    Acompanhe essa jornada <ArrowRight size={20} />
                  </a>
                </div>
                <div className="impact__metrics">
                  {impactMetrics.map(({ label, icon: MetricIcon }) => (
                    <div className="interactive-card" key={label}>
                      <div className="impact__metric-icon" aria-hidden="true">
                        <MetricIcon size={28} strokeWidth={1.6} />
                      </div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TRANSPARÊNCIA */}
          <section className="transparency section" id="transparencia">
            <div className="container transparency__grid">
              <div className="transparency__copy" data-reveal>
                <span className="section-index">Transparência</span>
                <h2>Confiança também se constrói com clareza.</h2>
                <p>Governança, integridade e prestação de contas não são anexos do nosso trabalho. São a base dele.</p>
                <div className="seal">
                  <FileCheck2 />
                  <span>
                    <strong>Compromisso público</strong>
                    Documentos oficiais abertos para consulta e download.
                  </span>
                </div>
              </div>
              <Accordion.Root className="accordion" type="single" collapsible defaultValue="item-0" data-reveal>
                {transparencyTopics.map((topic, index) => (
                  <Accordion.Item className="accordion__item" value={`item-${index}`} key={topic.title}>
                    <Accordion.Header>
                      <Accordion.Trigger className="accordion__trigger--clean">
                        {topic.title}
                        <ChevronDown className="accordion__chevron" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion__content accordion__content--clean">
                      <p>{topic.text}</p>
                      {topic.docs && topic.docs.length > 0 ? (
                        <div className="transparency-docs">
                          {topic.docs.map((doc) => (
                            <a
                              key={doc.href}
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transparency-doc-link"
                            >
                              <FileText size={17} strokeWidth={1.8} />
                              <span>{doc.label}</span>
                              <Download size={16} strokeWidth={2} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <a href="/contato" onClick={openContactPage} className="transparency-cta-link">
                          {topic.ctaLabel || 'Fale conosco'} <ArrowRight size={18} />
                        </a>
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </section>

          {/* FAÇA PARTE */}
          <section className="help section" id="ajude">
            <div className="container help__card" data-reveal>
              <img className="help__logo" src="/v3/brand/logo-3d.webp" alt="Fundação Net do Bem" />
              <div>
                <span className="section-index">Faça parte</span>
                <h2>Quem fortalece uma organização transforma muitas histórias.</h2>
              </div>
              <div className="help__actions">
                <a className="button button--primary" href="/contato" onClick={openContactPage}>
                  Quero ser parceiro <ArrowRight size={20} />
                </a>
                <a href="/contato" onClick={openContactPage}>
                  Quero contribuir de outra forma
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* FOOTER SIMPLIFICADO */}
      <footer className="footer" id="contato">
        <div className="container footer__lead">
          <div>
            <BrandLogo inverse onClickHome={(e) => navigateToSection('#inicio', e)} />
            <p>Fortalecendo quem protege a infância, com método, cuidado e transparência.</p>
          </div>
          <div className="footer__contact">
            <span>Onde estamos e contato</span>
            <div className="footer__address-block">
              <p className="footer__address-line">
                <MapPin size={18} />
                <span>
                  Av. Antônio Carlos Comitre, 1074 — Parque Campolim
                  <br />
                  Sorocaba — SP • CEP 18047-620
                </span>
              </p>
              <a className="footer__phone-link" href="https://wa.me/5515991877880" target="_blank" rel="noreferrer">
                <Phone size={18} />
                <strong>(15) 99187-7880</strong>
              </a>
            </div>
          </div>
        </div>

        <nav className="container footer__simple-nav" aria-label="Seções do site">
          <div className="footer__simple-links">
            {menuSections.map(([label, href]) =>
              href === '/contato' ? (
                <a href={href} key={label} onClick={openContactPage}>
                  {label}
                </a>
              ) : (
                <a href={href} key={label} onClick={(e) => navigateToSection(href, e)}>
                  {label}
                </a>
              ),
            )}
          </div>
          <a className="button button--primary footer__cta-btn" href="/contato" onClick={openContactPage}>
            Quero ajudar <ArrowRight size={18} />
          </a>
        </nav>

        <div className="container footer__legal">
          <span>© 2026 Fundação Net do Bem • CNPJ 69.084.154/0001-05</span>
          <div>
            <a href="#transparencia" onClick={(e) => navigateToSection('#transparencia', e)}>
              Privacidade
            </a>
            <a href="#transparencia" onClick={(e) => navigateToSection('#transparencia', e)}>
              Transparência
            </a>
            <a href="#transparencia" onClick={(e) => navigateToSection('#transparencia', e)}>
              Proteção à infância
            </a>
          </div>
          <span>Feito em rede ♥</span>
        </div>

        <img className="footer__heart" src="/v3/images/super-footer.webp" alt="Coração em rede da Fundação Net do Bem" />
      </footer>

      {/* POPUP FULLSCREEN RESPONSIVO - MINI CV COLABORADORES */}
      {selectedMember && (
        <div className="team-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
          <div className="team-modal__backdrop" onClick={() => setSelectedMember(null)} />
          <div className="team-modal__dialog">
            <button
              type="button"
              className="team-modal__close"
              onClick={() => setSelectedMember(null)}
              aria-label="Fechar mini currículo"
            >
              <X size={26} />
            </button>
            <div className="team-modal__header">
              <div className="team-modal__avatar-shell">
                <img src={selectedMember.avatar} alt={`Avatar de ${selectedMember.name}`} />
              </div>
              <div className="team-modal__header-copy">
                <span className="team-modal__badge">{selectedMember.badge}</span>
                <h2 id="team-modal-title">{selectedMember.name}</h2>
                <p className="team-modal__role">{selectedMember.role}</p>
              </div>
            </div>
            <div className="team-modal__body">
              <p className="team-modal__intro">{selectedMember.bioIntro}</p>
              {selectedMember.sections.map((sec, i) => (
                <div className="team-modal__section" key={i}>
                  {sec.title && <h3>{sec.title}</h3>}
                  <p>{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
