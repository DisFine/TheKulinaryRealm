import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './FrontEnd/HomePage'
import Header from './FrontEnd/header'
import Footer from './FrontEnd/footer'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HomePage />
    <Footer />
  </StrictMode>,
)
