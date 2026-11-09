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

  // Monta a URL oficial do Tally preservando query parameters para tracking e pré-preenchimento
  const [tallySrc] = useState(() => {
    const base = 'https://tally.so/embed/Qo1jd8'
    const params = new URLSearchParams()
    params.set('alignLeft', '1')
    params.set('hideTitle', '1')
    params.set('transparentBackground', '1')
    params.set('dynamicHeight', '1')

    if (typeof window !== 'undefined' && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.forEach((val, key) => {
        params.set(key, val)
      })
    }
    return `${base}?${params.toString()}`
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const scriptSrc = 'https://tally.so/widgets/embed.js'

    const initTally = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds()
      } else {
        const iframe = iframeRef.current
        if (iframe && iframe.dataset.tallySrc && !iframe.src) {
          iframe.src = iframe.dataset.tallySrc
        }
      }
    }

    // Ouvinte para mensagens do iframe-resizer e do Tally para dispensar o spinner suavemente
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        try {
          const parsed = JSON.parse(e.data)
          if (parsed?.event === 'Tally.FormLoaded' || parsed?.event === 'Tally.FormSizeChanged') {
            setIframeLoaded(true)
          }
        } catch {
          if (e.data.startsWith('[iFrameSizer]')) {
            setIframeLoaded(true)
          }
        }
      }
    }
    window.addEventListener('message', handleMessage)

    // Fallback de segurança para redes lentas ou adblockers
    const fallbackTimer = setTimeout(() => {
      setIframeLoaded(true)
      const iframe = iframeRef.current
      if (iframe && !iframe.src && iframe.dataset.tallySrc) {
        iframe.src = iframe.dataset.tallySrc
      }
    }, 2800)

    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      script.onload = () => initTally()
      script.onerror = () => initTally()
      document.body.appendChild(script)
    } else {
      const timer = setTimeout(initTally, 60)
      return () => {
        clearTimeout(timer)
        clearTimeout(fallbackTimer)
        window.removeEventListener('message', handleMessage)
      }
    }

    return () => {
      clearTimeout(fallbackTimer)
      window.removeEventListener('message', handleMessage)
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
              loading="lazy"
              width="100%"
              height="400"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Inauguração | Fundação Net do Bem"
              className={`invite-iframe ${iframeLoaded ? 'is-loaded' : ''}`}
              scrolling="no"
              style={{ overflow: 'hidden' }}
              onLoad={() => {
                setIframeLoaded(true)
              }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
