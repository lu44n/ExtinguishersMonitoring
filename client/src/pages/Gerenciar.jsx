import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FireExtinguisherCard } from '../components/FireExtinguisherCard';
import '../styles/Gerenciar.css';

export const Gerenciar = () => {
  const [extinguishers, setExtinguishers] = useState([]);

  const fetchExtinguishers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/extinguishers');
      const data = await response.json();
      setExtinguishers(data.extinguishers.all); 
    } catch (error) {
      console.error('Erro ao buscar extintores:', error);
    }
  };

  useEffect(() => {
    fetchExtinguishers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="primary-gerenciar">
          <div className="gerenciar-title-container">
              <div className="title-gerenciamento">Gerenciamento de Extintores | Metrô SP</div>
          </div>
          <div className="bttn-div">
            <div className="bttn-add-extinguisher">Adicionar Extintor</div>
            <div className="bttn-remove-extinguisher">Remover Extintor</div>
          </div>
          <div className="title-extinguishers-display">Lista de Extintores</div>
      </div>
      <div className="extinguishers-list">
          {extinguishers.map((extinguisher) => (
            <FireExtinguisherCard
              key={extinguisher.id}
              id={extinguisher.id}
              tipo={extinguisher.tipo}
              capacidade={extinguisher.capacidade}
              codigo_fabricante={extinguisher.codigo_fabricante}
              data_fabricacao={extinguisher.data_fabricacao}
              data_validade={extinguisher.data_validade}
              ultima_recarga={extinguisher.ultima_recarga}
              proxima_inspecao={extinguisher.proxima_inspecao}
              status={extinguisher.status}
              localizacao={extinguisher.localizacao}
            />
          ))}
        </div>
      <Footer />
    </div>
  )
}
