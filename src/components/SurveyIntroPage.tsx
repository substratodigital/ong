import { useState } from 'react'
import { ArrowRight, Clock3, ExternalLink, LayoutGrid, X } from 'lucide-react'

const PORTAL_URL = 'https://portal.netdobem.org.br/'

export function SurveyIntroPage({ onGoHome }: { onGoHome: () => void }) {
  const [accepted, setAccepted] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleStart = () => {
    if (!accepted) return
    window.location.assign(PORTAL_URL)
  }

  return (
    <section className="survey-intro-landing" aria-labelledby="survey-intro-title">
      <div className="survey-intro-landing__content">
        <img
          className="survey-intro-landing__logo"
          src="/brand/NET-DO-BEM-WHITE-HORIZONTAL.svg"
          alt="Fundação Net do Bem"
        />

        <h1 id="survey-intro-title">
          Conhecer para
          <br />
          fortalecer o cuidado.
        </h1>

        <p className="survey-intro-landing__description">
          Um retrato cuidadoso de quem acolhe, protege e transforma vidas. Suas respostas ajudam a construir o
          diagnóstico nacional das casas de acolhimento e a direcionar apoios reais da nossa rede.
        </p>

        <div className="survey-intro-landing__details">
          <span>
            <LayoutGrid aria-hidden="true" size={19} /> Etapas curtas, em média 10 questões
          </span>
          <span>
            <Clock3 aria-hidden="true" size={19} /> Salvo automaticamente
          </span>
        </div>

        <label className="survey-intro-landing__accept">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>
            Li a apresentação e aceito participar da pesquisa. Compartilharei apenas informações institucionais,
            sem identificar crianças ou famílias.
          </span>
        </label>

        <div className="survey-intro-landing__actions">
          <button
            type="button"
            className="survey-intro-landing__start"
            disabled={!accepted}
            onClick={handleStart}
          >
            <span>Entrar no Meu Acesso</span>
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </div>

        <div className="survey-intro-landing__links">
          <a href="/" onClick={(e) => { e.preventDefault(); onGoHome() }}>
            Quem somos <ExternalLink size={14} aria-hidden="true" />
          </a>
          <span aria-hidden="true">•</span>
          <button type="button" onClick={() => setShowPrivacy(true)}>
            Termo privacidade
          </button>
        </div>
      </div>

      {showPrivacy && (
        <div
          className="survey-privacy-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="survey-privacy-title"
          onClick={() => setShowPrivacy(false)}
        >
          <div className="survey-privacy-modal__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="survey-privacy-modal__close"
              aria-label="Fechar termo de privacidade"
              onClick={() => setShowPrivacy(false)}
            >
              <X size={22} />
            </button>

            <span className="survey-privacy-modal__eyebrow">TERMO DE PRIVACIDADE E CUIDADO COM AS INFORMAÇÕES</span>
            <h2 id="survey-privacy-title">Conhecer a instituição. Preservar as pessoas.</h2>
            <p className="survey-privacy-modal__lead">
              Compromisso da Fundação Net do Bem com a proteção de dados e o Estatuto da Criança e do Adolescente (ECA).
            </p>

            <div className="survey-privacy-modal__body">
              <h3>1. Dados exclusivamente institucionais</h3>
              <p>
                Esta pesquisa coleta indicadores estruturais, operacionais, financeiros e de articulação de rede das
                instituições de acolhimento. Em nenhuma hipótese devem ser informados nomes, imagens, prontuários ou
                histórias individuais que identifiquem crianças, adolescentes ou suas famílias de origem.
              </p>

              <h3>2. Finalidade do diagnóstico e E-book institucional</h3>
              <p>
                As informações consolidadas serão utilizadas pela Fundação Net do Bem para mapear as demandas reais das
                casas de acolhimento, direcionar programas de apoio e publicar diagnósticos agregados e estatísticos
                sobre a realidade do acolhimento no Brasil.
              </p>

              <h3>3. Armazenamento e retomada</h3>
              <p>
                As respostas preenchidas ficam salvas automaticamente no portal seguro da pesquisa para permitir que a
                instituição responda às 14 etapas no seu próprio ritmo.
              </p>
            </div>

            <div className="survey-privacy-modal__footer">
              <button type="button" className="survey-privacy-modal__btn" onClick={() => setShowPrivacy(false)}>
                Entendi e fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
