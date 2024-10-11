import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Home.css';

export const Home = () => {
  const [extinguisherData, setExtinguisherData] = useState({
    total: 0,
    nearMaintenance: 0,
    alertStatus: 0,
  });

  const fetchExtinguisherData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/extinguishers');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados dos extintores');
      }
      const data = await response.json();
      setExtinguisherData({
        total: data.total,
        nearMaintenance: data.nearMaintenance,
        alertStatus: data.alertStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExtinguisherData();
  }, []);

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
          <div className="boxs-container">
            <div className="info-box">
              <div className="info-text">Total de Extintores: </div>
              <div className="extintor-number">{extinguisherData.total}</div>
            </div>
            <div className="info-box">
              <div className="info-text">Próximos da Inspeção: </div>
              <div className="extintor-inspecao">{extinguisherData.nearMaintenance}</div>
            </div>
            <div className="info-box">
              <div className="info-text">Extintores em Alerta: </div>
              <div className="extintor-alerta">{extinguisherData.alertStatus}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}