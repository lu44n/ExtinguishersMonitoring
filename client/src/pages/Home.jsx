import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Home.css'

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="primary-div">
        <div className="title-container">
          <div className="home-title"><FontAwesomeIcon icon={faFireExtinguisher} /> | Sistema de Gestão de Extintores de Incêndio - Metrô SP</div>
        </div>
        <div className="desc-text-container">
          <div className="home-subtitle">Bem-vindo ao Sistema de Gestão de Extintores de Incêndio do Metrô de São Paulo!</div> 
          <div className="desc-text"> 
            Este projeto tem como objetivo centralizar e simplificar o controle de informações sobre extintores de incêndio localizados nas estações do metrô. Com uma interface intuitiva, os usuários poderão consultar, adicionar, editar e remover registros de extintores, garantindo a segurança e a conformidade com as normas de segurança. Junte-se a nós na missão de manter o Metrô de São Paulo seguro e preparado para qualquer eventualidade!
          </div>
          <div className="title-boxes">Informações Importantes</div>
          <div class="boxs-container">
            <div class="info-box">
              <div className="info-text">Total de Extintores: </div>
                <div className="extintor-number">1259</div>
            </div>
            <div class="info-box">
              <div className="info-text">Próximos da Inspeção: </div>
                <div className="extintor-inspecao">128</div>
            </div>
            <div class="info-box">
              <div className="info-text">Extintores em Alerta: </div>
                <div className="extintor-alerta">19</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}