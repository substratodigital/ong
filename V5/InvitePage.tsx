import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Calendar, MapPin, ShieldCheck, Sparkles } from 'lucide-react'

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

interface InvitePageProps {
  onBackHome: () => void
}

export function InvitePage({ onBackHome }: InvitePageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Preserva parâmetros da URL (ex: ?ref=...&convidado=...) e anexa ao Tally
  const [tallySrc, setTallySrc] = useState(
    'https://tally.so/embed/Qo1jd8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1',
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Se houver query params na URL atual, repassa para o iframe do Tally
    if (typeof window !== 'undefined' && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('alignLeft', '1')
      searchParams.set('hideTitle', '1')
      searchParams.set('transparentBackground', '1')
      searchParams.set('dynamicHeight', '1')
      setTallySrc(`https://tally.so/embed/Qo1jd8?${searchParams.toString()}`)
    }
  }, [])

  useEffect(() => {
    // Carrega o script oficial do Tally para ajuste dinâmico de altura e responsividade
    const scriptSrc = 'https://tally.so/widgets/embed.js'
    const loadTally = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds()
      } else {
        const iframe = iframeRef.current
        if (iframe && iframe.dataset.tallySrc && !iframe.src) {
          iframe.src = iframe.dataset.tallySrc
        }
      }
    }

    if (typeof window.Tally !== 'undefined') {
      loadTally()
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`)
      if (!script) {
        script = document.createElement('script')
        script.src = scriptSrc
        script.async = true
        script.onload = loadTally
        script.onerror = loadTally
        document.body.appendChild(script)
      } else {
        loadTally()
      }
    }
  }, [tallySrc])

  return (
    <div className="invite-page">
      <section className="invite-hero">
        <div className="invite-hero__wash invite-hero__wash--mint" />
        <div className="invite-hero__wash invite-hero__wash--yellow" />

        <div className="container">
          <button type="button" className="contact-back-btn" onClick={onBackHome}>
            <ArrowLeft size={18} /> Voltar para a página inicial
          </button>

          <div className="invite-hero__header">
            <div className="invite-badge">
              <Sparkles size={15} /> Evento Oficial de Inauguração
            </div>
            <h1>Confirmação de Presença — Inauguração Fundação Net do Bem</h1>
            <p>
              É uma honra celebrar este momento com você. Confirme sua presença preenchendo o formulário abaixo
              para organizarmos sua recepção com todo cuidado e carinho.
            </p>

            <div className="invite-meta-cards">
              <div className="invite-meta-card">
                <Calendar size={18} />
                <div>
                  <span>Data &amp; Recepção</span>
                  <strong>Inauguração Oficial</strong>
                </div>
              </div>
              <div className="invite-meta-card">
                <MapPin size={18} />
                <div>
                  <span>Localização</span>
                  <strong>Sorocaba — SP</strong>
                </div>
              </div>
              <div className="invite-meta-card">
                <ShieldCheck size={18} />
                <div>
                  <span>Privacidade</span>
                  <strong>Formulário Seguro &amp; Direto</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="invite-form-container">
            {!iframeLoaded && (
              <div className="invite-form-loading" aria-hidden="true">
                <div className="invite-form-spinner" />
                <span>Carregando formulário seguro...</span>
              </div>
            )}

            <iframe
              ref={iframeRef}
              data-tally-src={tallySrc}
              src={tallySrc}
              loading="lazy"
              width="100%"
              height="818"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Inauguração | Fundação Net do Bem"
              className={`invite-iframe ${iframeLoaded ? 'is-loaded' : ''}`}
              onLoad={() => {
                setIframeLoaded(true)
                if (typeof window.Tally !== 'undefined') {
                  window.Tally.loadEmbeds()
                }
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
