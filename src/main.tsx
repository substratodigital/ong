import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/latin-ext-400.css'
import '@fontsource/montserrat/latin-ext-500.css'
import '@fontsource/montserrat/latin-ext-600.css'
import '@fontsource/montserrat/latin-ext-700.css'
import '@fontsource/montserrat/latin-ext-800.css'
import '@fontsource/manrope/latin-ext-500.css'
import '@fontsource/manrope/latin-ext-600.css'
import '@fontsource/manrope/latin-ext-700.css'
import '@fontsource/manrope/latin-ext-800.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
