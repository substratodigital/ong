import { useEffect, useRef, useState, type FormEvent } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  HandHeart,
  HeartHandshake,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'

const PIX_KEY_DISPLAY = '69.084.154/0001-05'
const PIX_KEY_RAW = '69084154000105'

function crc16Ccitt(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function formatEmvField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

function generatePixPayload(): string {
  const gui = formatEmvField('00', 'br.gov.bcb.pix')
  const key = formatEmvField('01', PIX_KEY_RAW)
  const merchantAccount = formatEmvField('26', `${gui}${key}`)

  const payloadWithoutCrc =
    formatEmvField('00', '01') +
    merchantAccount +
    formatEmvField('52', '0000') +
    formatEmvField('53', '986') +
    formatEmvField('58', 'BR') +
    formatEmvField('59', 'FUNDACAO NET DO BEM') +
    formatEmvField('60', 'SOROCABA') +
    formatEmvField('62', formatEmvField('05', 'NETDOBEM')) +
    '6304'

  return payloadWithoutCrc + crc16Ccitt(payloadWithoutCrc)
}

const PIX_BRCODE = generatePixPayload()

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        },
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

interface ContactPageProps {
  onBackHome: () => void
  initialCategory?: 'doacao' | 'acolhimento'
}

export function ContactPage({ onBackHome, initialCategory = 'doacao' }: ContactPageProps) {
  const [category, setCategory] = useState<'doacao' | 'acolhimento'>(initialCategory)
  const [donorType, setDonorType] = useState<'pf' | 'pj'>('pf')

  // Form states
  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [contato, setContato] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [mensagem, setMensagem] = useState('')

  // PIX Copy states
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Turnstile & Submission states
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const siteKey =
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_TURNSTILE_SITE_KEY ||
    '1x00000000000000000000AA'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    let mounted = true

    const renderWidget = () => {
      if (!mounted || !turnstileRef.current || !window.turnstile) return
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: (token: string) => {
          if (mounted) setTurnstileToken(token)
        },
        'expired-callback': () => {
          if (mounted) setTurnstileToken('')
        },
        'error-callback': () => {
          if (mounted) setTurnstileToken('')
        },
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="challenges.cloudflare.com/turnstile"]',
      )
      if (existingScript) {
        existingScript.addEventListener('load', renderWidget)
      } else {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.async = true
        script.defer = true
        script.onload = renderWidget
        document.head.appendChild(script)
      }
    }

    return () => {
      mounted = false
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
    }
  }, [siteKey])

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY_DISPLAY)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 3000)
    } catch {
      // fallback
    }
  }

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(PIX_BRCODE)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 3000)
    } catch {
      // fallback
    }
  }

  const handlePhoneMask = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          donorType: category === 'doacao' ? donorType : undefined,
          nome: category === 'doacao' && donorType === 'pf' ? nome : undefined,
          empresa: category === 'doacao' && donorType === 'pj' ? empresa : undefined,
          instituicao: category === 'acolhimento' ? instituicao : undefined,
          contato: category === 'acolhimento' || (category === 'doacao' && donorType === 'pj') ? contato : undefined,
          email,
          whatsapp,
          mensagem,
          turnstileToken,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível enviar sua mensagem no momento.')
      }

      setSubmitStatus('success')
      setNome('')
      setEmpresa('')
      setInstituicao('')
      setContato('')
      setEmail('')
      setWhatsapp('')
      setMensagem('')
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } catch (err: any) {
      setSubmitStatus('error')
      setErrorMessage(err?.message || 'Erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* HERO / CABEÇALHO DA PÁGINA DE CONTATO & DOAÇÃO */}
      <section className="contact-hero">
        <div className="contact-hero__wash contact-hero__wash--mint" />
        <div className="contact-hero__wash contact-hero__wash--yellow" />
        <div className="container">
          <button type="button" className="contact-back-btn" onClick={onBackHome}>
            <ArrowLeft size={18} /> Voltar para a página inicial
          </button>

          <div className="contact-hero__header">
            <span className="section-index">Fale conosco e faça parte</span>
            <h1>Cada gesto fortalece uma rede inteira de proteção à infância.</h1>
            <p>
              Seja apoiando financeiramente, construindo uma parceria corporativa ou inscrevendo sua Casa de
              Acolhimento em nossos programas de fortalecimento institucional, sua conexão transforma realidades com
              método, governança e transparência.
            </p>
          </div>

          <div className="contact-grid">
            {/* COLUNA ESQUERDA: FORMULÁRIO DINÂMICO */}
            <div className="contact-form-card">
              <div className="contact-form-card__top">
                <span className="contact-step-label">1. Como você deseja se conectar?</span>
                <div className="contact-primary-tabs" role="tablist" aria-label="Tipo de contato">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={category === 'doacao'}
                    className={`contact-primary-tab ${category === 'doacao' ? 'is-active' : ''}`}
                    onClick={() => {
                      setCategory('doacao')
                      setSubmitStatus('idle')
                    }}
                  >
                    <div className="contact-primary-tab__icon">
                      <HandHeart size={22} />
                    </div>
                    <div className="contact-primary-tab__text">
                      <strong>Para Doações e Parcerias</strong>
                      <span>Quero apoiar ou investir na causa</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={category === 'acolhimento'}
                    className={`contact-primary-tab ${category === 'acolhimento' ? 'is-active' : ''}`}
                    onClick={() => {
                      setCategory('acolhimento')
                      setSubmitStatus('idle')
                    }}
                  >
                    <div className="contact-primary-tab__icon">
                      <Home size={22} />
                    </div>
                    <div className="contact-primary-tab__text">
                      <strong>Casas de Acolhimento</strong>
                      <span>Busco apoio técnico e capacitação</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* SUB-SELETOR PARA DOAÇÕES: PF vs PJ */}
              {category === 'doacao' && (
                <div className="contact-secondary-selector">
                  <span className="contact-step-label">2. Selecione o seu perfil de doador</span>
                  <div className="contact-subtabs" role="tablist" aria-label="Perfil de doador">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={donorType === 'pf'}
                      className={`contact-subtab ${donorType === 'pf' ? 'is-active' : ''}`}
                      onClick={() => setDonorType('pf')}
                    >
                      <User size={17} />
                      <span>Pessoa Física</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={donorType === 'pj'}
                      className={`contact-subtab ${donorType === 'pj' ? 'is-active' : ''}`}
                      onClick={() => setDonorType('pj')}
                    >
                      <Building2 size={17} />
                      <span>Pessoa Jurídica</span>
                    </button>
                  </div>
                </div>
              )}

              {/* COPY CONTEXTUAL DE ACORDO COM A SELEÇÃO */}
              <div className="contact-context-banner">
                <HeartHandshake size={20} />
                {category === 'doacao' && donorType === 'pf' && (
                  <p>
                    <strong>Pessoa Física:</strong> Sua contribuição fortalece programas de capacitação, gestão e
                    apoio estrutural para casas de acolhimento. Preencha seus dados para conversarmos ou receber
                    nosso acompanhamento de impacto.
                  </p>
                )}
                {category === 'doacao' && donorType === 'pj' && (
                  <p>
                    <strong>Pessoa Jurídica:</strong> Conecte sua empresa a projetos estruturados de ESG, investimento
                    social privado e fortalecimento da rede de proteção à infância com governança e prestação de contas.
                  </p>
                )}
                {category === 'acolhimento' && (
                  <p>
                    <strong>Casas de Acolhimento:</strong> Conte-nos sobre sua instituição e principais desafios de
                    gestão, equipe ou estrutura. Nossa equipe técnica entrará em contato para escuta e diagnóstico.
                  </p>
                )}
              </div>

              {submitStatus === 'success' ? (
                <div className="contact-success-box" role="status">
                  <div className="contact-success-box__icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3>Mensagem enviada com sucesso!</h3>
                  <p>
                    Agradecemos o seu contato com a <strong>Fundação Net do Bem</strong>. Nossa equipe recebeu suas
                    informações em <strong>site@netdobem.org.br</strong> e retornará em breve.
                  </p>
                  <button
                    type="button"
                    className="button button--primary"
                    onClick={() => setSubmitStatus('idle')}
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* CAMPOS DINÂMICOS */}
                  {category === 'doacao' && donorType === 'pf' && (
                    <div className="contact-field">
                      <label htmlFor="field-nome">Nome completo *</label>
                      <input
                        id="field-nome"
                        type="text"
                        required
                        placeholder="Digite seu nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  )}

                  {category === 'doacao' && donorType === 'pj' && (
                    <div className="contact-form__row">
                      <div className="contact-field">
                        <label htmlFor="field-empresa">Empresa *</label>
                        <input
                          id="field-empresa"
                          type="text"
                          required
                          placeholder="Nome da empresa ou organização"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="field-contato-pj">Contato (Responsável) *</label>
                        <input
                          id="field-contato-pj"
                          type="text"
                          required
                          placeholder="Seu nome e cargo"
                          value={contato}
                          onChange={(e) => setContato(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {category === 'acolhimento' && (
                    <div className="contact-form__row">
                      <div className="contact-field">
                        <label htmlFor="field-instituicao">Instituição *</label>
                        <input
                          id="field-instituicao"
                          type="text"
                          required
                          placeholder="Nome da Casa de Acolhimento / ONG"
                          value={instituicao}
                          onChange={(e) => setInstituicao(e.target.value)}
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="field-contato-inst">Contato (Responsável) *</label>
                        <input
                          id="field-contato-inst"
                          type="text"
                          required
                          placeholder="Nome e função na instituição"
                          value={contato}
                          onChange={(e) => setContato(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="contact-form__row">
                    <div className="contact-field">
                      <label htmlFor="field-email">E-mail *</label>
                      <input
                        id="field-email"
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="field-whatsapp">WhatsApp *</label>
                      <input
                        id="field-whatsapp"
                        type="tel"
                        required
                        placeholder="(15) 99999-9999"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(handlePhoneMask(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="field-mensagem">Mensagem *</label>
                    <textarea
                      id="field-mensagem"
                      rows={4}
                      required
                      placeholder={
                        category === 'acolhimento'
                          ? 'Conte um pouco sobre a instituição, cidade de atuação e como podemos apoiar...'
                          : donorType === 'pj'
                            ? 'Conte como sua empresa gostaria de construir essa parceria ou apoiar nossos programas...'
                            : 'Escreva sua mensagem, dúvida ou como gostaria de contribuir com a Fundação...'
                      }
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                    />
                  </div>

                  {/* CLOUDFLARE TURNSTILE RECAPTCHA */}
                  <div className="contact-security">
                    <div className="contact-security__header">
                      <Lock size={15} />
                      <span>Verificação de segurança Cloudflare anti-bots</span>
                    </div>
                    <div ref={turnstileRef} className="contact-turnstile-container" />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="contact-error-banner" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" className="button button--primary contact-submit-btn" disabled={submitting}>
                    {submitting ? 'Enviando mensagem...' : 'Enviar mensagem'}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* COLUNA DIREITA: QR CODE PIX ANIMADO & INFORMAÇÕES DIRETAS */}
            <aside className="contact-pix-sidebar">
              <div className="pix-card">
                <div className="pix-card__glow" />
                <div className="pix-card__badge">
                  <Sparkles size={15} /> Doação Direta e Transparente
                </div>
                <h2>Apoie agora via PIX</h2>
                <p>
                  Escaneie o QR Code com o aplicativo do seu banco ou copie a chave CNPJ oficial da{' '}
                  <strong>Fundação Net do Bem</strong>.
                </p>

                {/* QR CODE ANIMADO */}
                <div className="pix-qr-stage">
                  <div className="pix-qr-orbit pix-qr-orbit--outer" aria-hidden="true" />
                  <div className="pix-qr-orbit pix-qr-orbit--inner" aria-hidden="true" />
                  <div className="pix-qr-frame">
                    <span className="pix-qr-corner pix-qr-corner--tl" />
                    <span className="pix-qr-corner pix-qr-corner--tr" />
                    <span className="pix-qr-corner pix-qr-corner--bl" />
                    <span className="pix-qr-corner pix-qr-corner--br" />
                    <div className="pix-qr-scanline" aria-hidden="true" />
                    <QRCodeSVG
                      value={PIX_BRCODE}
                      size={208}
                      bgColor="#FFFFFF"
                      fgColor="#202434"
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* CHAVE PIX CNPJ */}
                <div className="pix-key-box">
                  <div className="pix-key-box__info">
                    <span>Chave PIX (CNPJ)</span>
                    <strong>{PIX_KEY_DISPLAY}</strong>
                  </div>
                  <button
                    type="button"
                    className={`pix-copy-btn ${copiedKey ? 'is-copied' : ''}`}
                    onClick={handleCopyPixKey}
                  >
                    {copiedKey ? (
                      <>
                        <Check size={16} /> Copiada!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copiar Chave
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  className={`pix-brcode-btn ${copiedCode ? 'is-copied' : ''}`}
                  onClick={handleCopyPixCode}
                >
                  {copiedCode ? (
                    <>
                      <Check size={16} /> Código PIX Copia e Cola copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copiar código PIX Copia e Cola
                    </>
                  )}
                </button>

                <div className="pix-card__trust">
                  <ShieldCheck size={20} />
                  <div>
                    <strong>100% destinado ao impacto social</strong>
                    <span>Favorecido: Fundação Net do Bem • CNPJ 69.084.154/0001-05</span>
                  </div>
                </div>
              </div>

              {/* CARD DE CONTATO DIRETO / ENDEREÇO */}
              <div className="contact-direct-card">
                <h3>Atendimento Direto</h3>
                <div className="contact-direct-list">
                  <a href="https://wa.me/5515991877880" target="_blank" rel="noreferrer" className="contact-direct-item">
                    <Phone size={18} />
                    <div>
                      <span>Telefone / WhatsApp</span>
                      <strong>(15) 99187-7880</strong>
                    </div>
                  </a>
                  <a href="mailto:site@netdobem.org.br" className="contact-direct-item">
                    <Mail size={18} />
                    <div>
                      <span>E-mail institucional</span>
                      <strong>site@netdobem.org.br</strong>
                    </div>
                  </a>
                  <div className="contact-direct-item">
                    <MapPin size={18} />
                    <div>
                      <span>Endereço Físico</span>
                      <strong>Av. Antônio Carlos Comitre, 1074</strong>
                      <small>Parque Campolim — Sorocaba / SP • CEP 18047-620</small>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

