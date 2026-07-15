import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  FileCheck2,
  HandHeart,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'
import { Button } from './components/ui/Button'
import { HeartMark, Logo } from './components/Logo'

const HeartScene = lazy(() => import('./components/HeartScene').then((module) => ({ default: module.HeartScene })))

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { number: '01', title: 'Pesquisa e conhecimento', text: 'Mapeamos a realidade para transformar necessidades em decisões melhores.', icon: BookOpen, color: 'pink' },
  { number: '02', title: 'Capacitação e gestão', text: 'Desenvolvemos lideranças, processos, governança e sustentabilidade.', icon: BarChart3, color: 'purple' },
  { number: '03', title: 'Aceleração de organizações', text: 'Construímos planos de desenvolvimento e acompanhamos sua evolução.', icon: Sparkles, color: 'yellow' },
  { number: '04', title: 'Articulação e advocacy', text: 'Conectamos organizações, empresas, especialistas e poder público.', icon: Network, color: 'mint' },
]

const journey = [
  ['Escutar', 'Diagnóstico da realidade institucional, financeira e operacional.'],
  ['Planejar', 'Metas, prioridades e indicadores construídos em conjunto.'],
  ['Fortalecer', 'Capacitação, mentoria e consultoria aplicadas à rotina.'],
  ['Conectar', 'Parcerias e recursos para sustentar transformações duradouras.'],
]

const transparency = [
  ['Institucional', 'Ata de constituição, estatuto, CNPJ e composição da governança.'],
  ['Planejamento', 'Plano estratégico, metas, indicadores e plano anual de atividades.'],
  ['Financeiro e impacto', 'Demonstrações, relatórios anuais, projetos e recursos destinados.'],
  ['Integridade', 'Código de ética, políticas institucionais e canal de denúncias.'],
]

function App() {
  const app = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.from('.hero__eyebrow, .hero h1, .hero__lead, .hero__actions, .hero__note', {
        opacity: 0,
        y: 38,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.hero__visual', { opacity: 0, scale: 0.78, rotate: 4, duration: 1.35, ease: 'expo.out' })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 56,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        })
      })
      gsap.to('.hero__visual-inner', {
        yPercent: 10,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
      gsap.to('.ticker__track', {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1,
      })
    }, app)
    return () => context.revert()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={app}>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Navegação principal">
            <a href="#quem-somos" onClick={closeMenu}>Quem somos</a>
            <a href="#como-atuamos" onClick={closeMenu}>Como atuamos</a>
            <a href="#impacto" onClick={closeMenu}>Impacto</a>
            <a href="#transparencia" onClick={closeMenu}>Transparência</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
            <a className="nav__donate" href="#ajude" onClick={closeMenu}>Quero ajudar <ArrowRight size={16} /></a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero__orb hero__orb--one" />
          <div className="hero__orb hero__orb--two" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <div className="hero__eyebrow"><span /> Uma rede de cuidado que transforma</div>
              <h1>Fortalecemos quem <em>protege a infância.</em></h1>
              <p className="hero__lead">Apoiamos casas de acolhimento e organizações sociais para que atuem com mais estrutura, governança, transparência e impacto.</p>
              <div className="hero__actions">
                <a className="button button--primary button--default" href="#como-atuamos">Conheça nosso trabalho <ArrowRight size={18} /></a>
                <a className="button button--secondary button--default" href="#ajude">Apoie a Fundação <HandHeart size={18} /></a>
              </div>
              <p className="hero__note"><ShieldCheck size={18} /> Não atendemos diretamente: fortalecemos quem já cuida.</p>
            </div>
            <div className="hero__visual" aria-label="Coração colorido em forma de rede">
              <div className="hero__visual-inner"><Suspense fallback={<div className="hero__canvas-fallback"><HeartMark /></div>}><HeartScene /></Suspense></div>
              <div className="hero__sticker hero__sticker--top">conexão</div>
              <div className="hero__sticker hero__sticker--bottom"><HeartMark title="Cuidado em rede" /> cuidado em rede</div>
            </div>
          </div>
          <a className="hero__scroll" href="#quem-somos"><ArrowDown size={17} /> Role para descobrir</a>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[...Array(2)].flatMap((_, group) => ['escutar', 'fortalecer', 'conectar', 'transformar'].map((word) => (
              <span key={`${group}-${word}`}>{word} <HeartMark title="" /></span>
            )))}
          </div>
        </div>

        <section className="intro section" id="quem-somos">
          <div className="container intro__grid">
            <div className="section-label" data-reveal>01 — Nossa razão de existir</div>
            <div className="intro__content" data-reveal>
              <p className="kicker">Mais estrutura para quem acolhe.<br />Mais futuro para quem precisa.</p>
              <p className="body-large">A Fundação Net do Bem nasceu em Sorocaba para profissionalizar e fortalecer organizações que cuidam de crianças e adolescentes em situação de vulnerabilidade.</p>
              <div className="intro__principles">
                <div><Target /><strong>Missão</strong><span>Mobilizar recursos, conhecimento e parcerias para fortalecer organizações que protegem a infância.</span></div>
                <div><Sparkles /><strong>Visão</strong><span>Ser referência em profissionalização e sustentabilidade para organizações dedicadas à infância.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="pillars section" id="como-atuamos">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><span className="section-label">02 — Como atuamos</span><h2>Uma rede fica mais forte quando o conhecimento circula.</h2></div>
              <p>Transformamos desafios de gestão em caminhos possíveis, respeitando a realidade de cada organização.</p>
            </div>
            <div className="pillars__grid">
              {pillars.map(({ number, title, text, icon: Icon, color }) => (
                <article className={`pillar-card pillar-card--${color}`} key={title} data-reveal>
                  <div className="pillar-card__top"><span>{number}</span><div className="clay-icon"><Icon /></div></div>
                  <h3>{title}</h3><p>{text}</p><ArrowRight className="pillar-card__arrow" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey section">
          <div className="container journey__grid">
            <div className="journey__visual" data-reveal>
              <div className="clay-scene" role="img" aria-label="Ilustração em massinha de uma rede de pessoas fortalecendo uma organização">
                <div className="clay-scene__fallback"><Users /><span>Juntos, a mudança ganha forma.</span></div>
              </div>
            </div>
            <div className="journey__content" data-reveal>
              <span className="section-label">03 — A jornada</span>
              <h2>Da escuta à transformação sustentável.</h2>
              <div className="journey__steps">
                {journey.map(([title, text], index) => (
                  <div className="journey__step" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="impact section" id="impacto">
          <div className="container" data-reveal>
            <div className="impact__card">
              <div className="impact__copy">
                <span className="section-label section-label--light">04 — Impacto em construção</span>
                <h2>Medir para aprender.<br />Aprender para ampliar.</h2>
                <p>Nossa primeira base de impacto está sendo construída com indicadores responsáveis — sem promessas vazias e sem confundir alcance direto com benefício indireto.</p>
                <a className="button button--light button--default" href="#contato">Acompanhe essa jornada <ArrowRight size={18} /></a>
              </div>
              <div className="impact__metrics">
                {['Organizações fortalecidas', 'Profissionais capacitados', 'Planos de melhoria implantados', 'Recursos mobilizados'].map((metric, index) => (
                  <div key={metric}><strong>0{index + 1}</strong><span>{metric}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="transparency section" id="transparencia">
          <div className="container transparency__grid">
            <div className="transparency__copy" data-reveal>
              <span className="section-label">05 — Transparência</span>
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
                  <Accordion.Content><p>{text}</p><a href="#contato">Documentos em preparação <ArrowRight size={15} /></a></Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </section>

        <section className="help section" id="ajude">
          <div className="container help__card" data-reveal>
            <div className="help__heart"><HeartMark /></div>
            <div><span className="section-label">06 — Faça parte</span><h2>Quem fortalece uma organização transforma muitas histórias.</h2></div>
            <div className="help__actions">
              <Button onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}>Quero ser parceiro <ArrowRight size={18} /></Button>
              <a href="#contato">Quero contribuir de outra forma</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contato">
        <div className="container footer__top">
          <div><Logo inverse /><p>Fortalecendo quem protege a infância, com método, cuidado e transparência.</p></div>
          <div className="footer__contact"><span>Vamos conversar?</span><strong className="footer__email-placeholder">E-mail institucional em definição</strong><p>Sorocaba — SP</p></div>
        </div>
        <div className="container footer__bottom"><span>© 2026 Fundação Net do Bem</span><div><a href="#transparencia">Privacidade</a><a href="#transparencia">Transparência</a></div><span>Feito em rede ♥</span></div>
      </footer>
    </div>
  )
}

export default App
