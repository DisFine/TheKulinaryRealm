import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './FrontEnd/HomePage'
import Header from './FrontEnd/header'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HomePage />
  </StrictMode>,
)
