type LogoProps = {
  compact?: boolean
  inverse?: boolean
}

export function HeartMark({ title = 'Fundação Net do Bem' }: { title?: string }) {
  return (
    <svg className="heart-mark" viewBox="0 0 96 86" role="img" aria-label={title}>
      <defs>
        <linearGradient id="heart-spectrum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F28CB1" />
          <stop offset=".42" stopColor="#F5C84C" />
          <stop offset=".68" stopColor="#48C9B0" />
          <stop offset="1" stopColor="#8B6FE8" />
        </linearGradient>
        <clipPath id="heart-shape">
          <path d="M48 82C33 68 8 52 8 29 8 12 29 4 42 18l6 7 6-7C67 4 88 12 88 29c0 23-25 39-40 53Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#heart-shape)" fill="none" stroke="url(#heart-spectrum)" strokeWidth="2.7" strokeLinecap="round">
        <path d="M-2 18C19 34 30 2 50 28S77 57 99 33" />
        <path d="M-4 46C18 19 31 62 52 43S80 13 101 49" />
        <path d="M4 71C26 45 38 88 57 63S80 41 97 70" />
        <path d="M17 1C5 26 42 32 26 57S24 78 37 91" />
        <path d="M45 -4C65 18 30 38 52 55S59 78 56 93" />
        <path d="M75 -2C91 20 56 34 75 56S82 76 70 91" />
      </g>
      <g fill="#fff" stroke="url(#heart-spectrum)" strokeWidth="2.4">
        <circle cx="27" cy="27" r="4" /><circle cx="49" cy="29" r="3.7" />
        <circle cx="69" cy="28" r="4.5" /><circle cx="20" cy="49" r="3.5" />
        <circle cx="42" cy="50" r="4.4" /><circle cx="70" cy="51" r="3.8" />
        <circle cx="47" cy="70" r="4.2" />
      </g>
    </svg>
  )
}

export function Logo({ compact = false, inverse = false }: LogoProps) {
  return (
    <a className={`logo ${inverse ? 'logo--inverse' : ''}`} href="#inicio" aria-label="Fundação Net do Bem — início">
      <HeartMark />
      {!compact && (
        <span className="logo__type">
          <span className="logo__foundation">Fundação</span>
          <span className="logo__name">Net do Bem</span>
        </span>
      )}
    </a>
  )
}
