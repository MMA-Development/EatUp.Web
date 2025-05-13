import { Providers } from '@app/providers.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@features/map/components/leaflet.css'
// @ts-expect-error does work
import 'moment/dist/locale/da.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
