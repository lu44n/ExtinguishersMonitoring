import React from 'react'
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Gerenciar.css'

export const Gerenciar = () => {
  return (
    <div>
      <Navbar />
      <div className="primary-gerenciar">
          <div className="gerenciar-title-container">
              <div className="title-gerenciamento">Gerenciamento de Extintores | Metrô SP</div>
          </div>
      </div>
      <Footer />
    </div>
  )
}
