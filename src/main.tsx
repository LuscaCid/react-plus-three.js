import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Order matters: tokens define the variables, glass.css is plain CSS that must
// lose to Tailwind utilities, so the Tailwind layers are imported last.
import './styles/tokens.css'
import './styles/glass.css'
import './index.css'

import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
