import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './Routes'
import StripeProvider from './components/StripeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StripeProvider>
        <AppRoutes />
      </StripeProvider>
    </BrowserRouter>
  </StrictMode>,
)
