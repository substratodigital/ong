import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  FileCheck2,
  HandHeart,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Pesquisa e conhecimento',
    text: 'Mapeamos a realidade para transformar necessidades em decisões melhores e orientar investimentos responsáveis.',
    icon: '/v2/icons/search.webp',
    tone: 'coral',
  },
  {
    number: '02',
    title: 'Capacitação e gestão',
    text: 'Desenvolvemos lideranças, processos, planejamento, governança e sustentabilidade institucional.',
    icon: '/v2/icons/book.webp',
    tone: 'purple',
  },
  {
    number: '03',
    title: 'Aceleração de organizações',
    text: 'Construímos planos de desenvolvimento e acompanhamos sua implantação com metas e indicadores.',
    icon: '/v2/icons/casa-decolar.webp',
    tone: 'yellow',
  },
  {
    number: '04',
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

const values = [
  ['Compromisso com a infância', 'Priorizar o bem-estar, a proteção e o desenvolvimento integral de crianças e adolescentes.', 'uniao.webp'],
  ['Transparência', 'Garantir clareza e responsabilidade na gestão e na destinação dos recursos.', 'cadeado.webp'],
  ['Ética', 'Atuar com integridade em todas as relações, decisões e escolhas institucionais.', 'regra.webp'],
  ['Solidariedade', 'Incentivar a participação da sociedade na promoção de mudanças positivas.', 'parcerias.webp'],
  ['Respeito e dignidade', 'Reconhecer cada criança e adolescente como sujeito de direitos.', 'uniao.webp'],
  ['Impacto social', 'Buscar resultados concretos, responsáveis e sustentáveis.', 'crescimento.webp'],
  ['Colaboração', 'Construir parcerias estratégicas com instituições, empresas, governos e cidadãos.', 'fluxograma.webp'],
  ['Inovação', 'Desenvolver soluções criativas para ampliar recursos e alcance.', 'casa-decolar.webp'],
  ['Governança', 'Apoiar casas de acolhimento para operarem de forma mais efetiva.', 'governanca.webp'],
]

const transparency = [
  ['Institucional', 'Ata de constituição, estatuto social, CNPJ e composição da governança.'],
  ['Planejamento', 'Plano estratégico, plano anual de atividades, metas e indicadores.'],
  ['Financeiro e impacto', 'Demonstrações financeiras, relatórios anuais, projetos apoiados e recursos destinados.'],
  ['Integridade', 'Código de ética, políticas institucionais, proteção à infância e canal de denúncias.'],
]

const footerGroups = [
  {
    title: 'Institucional',
    links: [['Quem somos', '#quem-somos'], ['História', '#quem-somos'], ['Missão e visão', '#proposito'], ['Valores', '#valores'], ['Governança', '#transparencia']],
  },
  {
    title: 'Nossa atuação',
    links: [['Como atuamos', '#como-atuamos'], ['Programas', '#como-atuamos'], ['Jornada', '#jornada'], ['Impacto', '#impacto'], ['Notícias', '#contato']],
  },
  {
    title: 'Transparência',
    links: [['Documentos', '#transparencia'], ['Relatórios', '#transparencia'], ['Prestação de contas', '#transparencia'], ['Integridade', '#transparencia'], ['Privacidade e LGPD', '#transparencia']],
  },
  {
    title: 'Participe',
    links: [['Faça uma doação', '#ajude'], ['Seja parceiro', '#ajude'], ['Voluntariado técnico', '#ajude'], ['Apoie um projeto', '#ajude'], ['Contato', '#contato']],
  },
]

function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className="brand-logo" href="#inicio" aria-label="Fundação Net do Bem — início">
      <img src={inverse ? '/v2/brand/logo-white.svg' : '/v2/brand/logo-purple.svg'} alt="Fundação Net do Bem" />
    </a>
  )
}

function App() {
  const app = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const enableVideo = () => setLoadVideo(true)
    if (document.readyState === 'complete') enableVideo()
    else window.addEventListener('load', enableVideo, { once: true })
    return () => window.removeEventListener('load', enableVideo)
  }, [])

  useEffect(() => {
    if (!window.location.hash) return
    const target = document.querySelector(window.location.hash)
    requestAnimationFrame(() => target?.scrollIntoView())
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  useLayoutEffect(() => {
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
            .from('.hero__lead, .hero__actions, .hero__note', { autoAlpha: 0, y: 28, stagger: 0.09, duration: 0.7 }, '-=.45')
            .from('.hero__media-shell', { autoAlpha: 0, scale: 0.92, rotate: 1.5, duration: 1.1 }, '-=.95')

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

          gsap.to('.hero__media-layer', {
            yPercent: desktop ? 10 : 5,
            scale: desktop ? 1.08 : 1.03,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
          })

          gsap.to('.ticker__track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })

          if (desktop) {
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
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={app}>
      <header className={`site-header ${menuOpen ? 'site-header--menu-open' : ''}`}>
        <div className="container site-header__inner">
          <BrandLogo inverse={menuOpen} />
          <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Navegação principal">
            <span className="nav__overline">Explore a Fundação</span>
            <a style={{ '--order': 1 } as CSSProperties} href="#quem-somos" onClick={closeMenu}>Quem somos</a>
            <a style={{ '--order': 2 } as CSSProperties} href="#como-atuamos" onClick={closeMenu}>Como atuamos</a>
            <a style={{ '--order': 3 } as CSSProperties} href="#impacto" onClick={closeMenu}>Impacto</a>
            <a style={{ '--order': 4 } as CSSProperties} href="#transparencia" onClick={closeMenu}>Transparência</a>
            <a style={{ '--order': 5 } as CSSProperties} href="#contato" onClick={closeMenu}>Contato</a>
            <a style={{ '--order': 6 } as CSSProperties} className="nav__donate" href="#ajude" onClick={closeMenu}>Quero ajudar <ArrowRight size={18} /></a>
            <div className="nav__mobile-footer">Sorocaba — SP <span>•</span> Fundação Net do Bem</div>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero__wash hero__wash--yellow" />
          <div className="hero__wash hero__wash--mint" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <div className="hero__eyebrow"><span /> Uma rede de cuidado que transforma</div>
              <h1>
                <span className="hero__title-mask"><span className="hero__title-line">Fortalecemos</span></span>
                <span className="hero__title-mask"><span className="hero__title-line">quem <span className="hero__inline-accent">protege a</span></span></span>
                <span className="hero__title-mask"><span className="hero__title-line hero__title-line--accent">infância.</span></span>
              </h1>
              <p className="hero__lead">Apoiamos casas de acolhimento e organizações sociais para que atuem com mais estrutura, governança, transparência e impacto.</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#como-atuamos">Conheça nosso trabalho <ArrowRight size={20} /></a>
                <a className="button button--secondary" href="#ajude">Apoie a Fundação <HandHeart size={20} /></a>
              </div>
              <p className="hero__note"><ShieldCheck size={21} /> Não atendemos diretamente: fortalecemos quem já cuida.</p>
            </div>

            <div className="hero__media-shell" aria-label="Coração em rede conectando pessoas e organizações">
              <div className="hero__media-layer">
                <img className="hero__poster" src="/v2/images/network-heart.png" alt="Pessoas construindo uma rede de cuidado ao redor de um coração" />
                {loadVideo && (
                  <video className={videoReady ? 'is-ready' : ''} muted autoPlay loop playsInline preload="metadata" onCanPlay={() => setVideoReady(true)} aria-hidden="true">
                    <source src="/v2/media/hero.mp4" type="video/mp4" />
                  </video>
                )}
              </div>
              <span className="hero__sticker hero__sticker--top">conexão</span>
              <span className="hero__sticker hero__sticker--bottom"><img src="/v2/brand/icon-purple.svg" alt="" /> cuidado em rede</span>
            </div>
          </div>
          <a className="hero__scroll" href="#quem-somos"><ArrowDown size={20} /> Role para descobrir</a>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[...Array(2)].flatMap((_, group) => ['escutar', 'fortalecer', 'conectar', 'transformar'].map((word) => (
              <span key={`${group}-${word}`}>{word}<img src="/v2/brand/icon-purple.svg" alt="" /></span>
            )))}
          </div>
        </div>

        <section className="story section" id="quem-somos">
          <div className="container story__grid">
            <div className="section-index" data-reveal>01 — Nossa história</div>
            <div className="story__content">
              <h2 data-reveal>Um sonho grande que começa fortalecendo quem já faz a diferença.</h2>
              <div className="story__body" data-reveal>
                <p>A Fundação Net do Bem nasceu em <strong>26 de novembro de 2025</strong>, em Sorocaba, com o desejo de deixar um legado e devolver à sociedade parte do que foi conquistado ao longo da vida.</p>
                <p>A experiência prática com casas de acolhimento mostrou que muitas organizações realizam um trabalho essencial, mas enfrentam dificuldades de gestão, estrutura, governança, captação e sustentabilidade.</p>
                <p>Por isso, a Fundação não atende diretamente crianças e adolescentes: assessora e fortalece as organizações responsáveis pelo acolhimento por meio de pesquisa, capacitação, consultoria, advocacy e mobilização de recursos.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="purpose section" id="proposito">
          <div className="container">
            <div className="purpose__heading" data-reveal>
              <span className="section-index">02 — Propósito institucional</span>
              <h2>Missão clara.<br />Visão compartilhada.<br />Impacto sustentável.</h2>
            </div>
            <div className="purpose__grid">
              <article className="purpose-card purpose-card--objective interactive-card" data-reveal>
                <span>Objetivo</span>
                <h3>Fortalecer quem já atua diretamente na proteção da infância.</h3>
                <p>Apoiar entidades que auxiliam crianças e adolescentes em situação de vulnerabilidade social, promovendo e defendendo seus direitos fundamentais em conformidade com o ECA.</p>
              </article>
              <article className="purpose-card purpose-card--mission interactive-card" data-reveal>
                <span>Missão</span>
                <h3>Mobilizar e apoiar.</h3>
                <p>Mobilizar e apoiar na gestão de recursos, parcerias e sociedade, de forma transparente e eficiente, para fortalecer instituições que promovem a proteção, o desenvolvimento e a inclusão de crianças em situação de vulnerabilidade, contribuindo para a construção de oportunidades e de um futuro mais digno.</p>
              </article>
              <article className="purpose-card purpose-card--vision interactive-card" data-reveal>
                <span>Visão</span>
                <h3>Ser referência em gestão transparente.</h3>
                <p>Ser uma referência na captação e gestão transparente de recursos para causas voltadas à infância, ampliando o impacto social por meio do fortalecimento de organizações comprometidas com seu bem-estar e desenvolvimento, para que toda criança tenha acesso à proteção, acolhimento, educação, saúde e oportunidades para alcançar seu pleno potencial.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="pillars section" id="como-atuamos">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><span className="section-index">03 — Como atuamos</span><h2>Uma rede fica mais forte quando o conhecimento circula.</h2></div>
              <p>Transformamos desafios de gestão em caminhos possíveis, respeitando a realidade de cada organização.</p>
            </div>
            <div className="pillars__grid">
              {pillars.map(({ number, title, text, icon, tone }) => (
                <article className={`pillar-card pillar-card--${tone} interactive-card`} key={title} data-reveal>
                  <div className="card-glow" />
                  <div className="pillar-card__top"><span>{number}</span><img src={icon} alt="" /></div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <ArrowRight className="pillar-card__arrow" />
                </article>
              ))}
            </div>
            <figure className="wide-scene" data-image-reveal>
              <img src="/v2/images/scene-planning.webp" alt="Profissionais em massinha construindo um plano de desenvolvimento" />
              <figcaption><strong>Da estratégia à prática.</strong><span>Planejamento construído junto com quem conhece a realidade.</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="journey section" id="jornada">
          <div className="container journey__grid">
            <div className="journey__visual" data-image-reveal>
              <img src="/v2/images/scene-capacity.webp" alt="Capacitação em massinha com profissionais analisando indicadores" />
              <div className="journey__badge"><img src="/v2/icons/crescimento.webp" alt="" /><span>Conhecimento que vira capacidade.</span></div>
            </div>
            <div className="journey__content" data-reveal>
              <span className="section-index">04 — A jornada</span>
              <h2>Da escuta à transformação sustentável.</h2>
              <div className="journey__steps">
                {journey.map(([title, text], index) => (
                  <div className="journey__step" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="values section" id="valores">
          <div className="container">
            <div className="section-heading values__heading" data-reveal>
              <div><span className="section-index">05 — Nossos valores</span><h2>Princípios que orientam cada decisão.</h2></div>
              <p>Os valores tornam visível como a Fundação pretende cumprir sua missão, construir confiança e mobilizar recursos com responsabilidade.</p>
            </div>
            <div className="values__track" role="list">
              {values.map(([title, text, icon], index) => (
                <article className="value-card interactive-card" role="listitem" key={title} data-reveal>
                  <span>0{index + 1}</span><img src={`/v2/icons/${icon}`} alt="" /><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <div className="integrity-note" data-reveal>
              <img src="/v2/icons/governanca.webp" alt="" />
              <span>Resultado esperado</span>
              <p>Uma atuação íntegra: reta, ética, responsável, honrada, virtuosa e exemplar — capaz de servir de referência para toda a rede.</p>
            </div>
          </div>
        </section>

        <section className="impact section" id="impacto">
          <div className="container" data-reveal>
            <div className="impact__card">
              <div className="impact__copy">
                <span className="section-index section-index--light">06 — Impacto em construção</span>
                <h2>Medir para aprender.<br />Aprender para ampliar.</h2>
                <p>Nossa primeira base de impacto está sendo construída com indicadores responsáveis — sem promessas vazias e sem confundir alcance direto com benefício indireto.</p>
                <a className="button button--light" href="#contato">Acompanhe essa jornada <ArrowRight size={20} /></a>
              </div>
              <div className="impact__metrics">
                {['Organizações fortalecidas', 'Profissionais capacitados', 'Planos de melhoria implantados', 'Recursos mobilizados'].map((metric, index) => (
                  <div className="interactive-card" key={metric}><strong>0{index + 1}</strong><span>{metric}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="transparency section" id="transparencia">
          <div className="container transparency__grid">
            <div className="transparency__copy" data-reveal>
              <span className="section-index">07 — Transparência</span>
              <h2>Confiança também se constrói com clareza.</h2>
              <p>Governança, integridade e prestação de contas não são anexos do nosso trabalho. São a base dele.</p>
              <div className="seal"><FileCheck2 /><span><strong>Compromisso público</strong>Documentos organizados por ano e categoria.</span></div>
            </div>
            <Accordion.Root className="accordion" type="single" collapsible defaultValue="item-0" data-reveal>
              {transparency.map(([title, text], index) => (
                <Accordion.Item className="accordion__item" value={`item-${index}`} key={title}>
                  <Accordion.Header>
                    <Accordion.Trigger><span>0{index + 1}</span>{title}<ChevronDown className="accordion__chevron" /></Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content><p>{text}</p><a href="#contato">Documentos em preparação <ArrowRight size={18} /></a></Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </section>

        <section className="help section" id="ajude">
          <div className="container help__card" data-reveal>
            <img className="help__logo" src="/v2/brand/logo-3d.webp" alt="Fundação Net do Bem" />
            <div><span className="section-index">08 — Faça parte</span><h2>Quem fortalece uma organização transforma muitas histórias.</h2></div>
            <div className="help__actions">
              <a className="button button--primary" href="#contato">Quero ser parceiro <ArrowRight size={20} /></a>
              <a href="#contato">Quero contribuir de outra forma</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contato">
        <div className="container footer__lead">
          <div><BrandLogo inverse /><p>Fortalecendo quem protege a infância, com método, cuidado e transparência.</p></div>
          <div className="footer__contact"><span>Vamos conversar?</span><strong>E-mail institucional em definição</strong><p>Sorocaba — SP</p></div>
        </div>

        <div className="container footer__navigation" aria-label="Navegação do rodapé">
          {footerGroups.map((group) => (
            <div key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <a href={href} key={label}>{label}<ArrowRight size={15} /></a>)}</div>
          ))}
        </div>

        <div className="container footer__legal">
          <span>© 2026 Fundação Net do Bem</span>
          <div><a href="#transparencia">Privacidade</a><a href="#transparencia">Transparência</a><a href="#transparencia">Proteção à infância</a></div>
          <span>Feito em rede ♥</span>
        </div>

        <img className="footer__heart" src="/v2/images/super-footer.webp" alt="Coração em rede da Fundação Net do Bem" />
      </footer>
    </div>
  )
}

export default App
