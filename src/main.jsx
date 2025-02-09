import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './FrontEnd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index />
  </StrictMode>,
)
