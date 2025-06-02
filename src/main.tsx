import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AppRoutes from './Routes'
import StripeProvider from './components/StripeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <StripeProvider>
        <AppRoutes />
      </StripeProvider>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
