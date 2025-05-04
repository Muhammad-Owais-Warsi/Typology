import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Play from './components/play.jsx'
import FindMatch from './components/find.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FindMatch />
  </StrictMode>,
)
