import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Consulta.css'
import { FireExtinguisherCard } from '../components/FireExtinguisherCard';

export const Consulta = () => {
  return (
    <div className="primary-consulta">
        <div className="consultar-title-container">
            <div className="title-consulta">Consulta de Extintores | Metrô SP</div>
        </div>
        <div className="div-search-extinguisher">
            <input type="text" className="search-extinguisher" placeholder="Insira o ID do Extintor"/> 
            <div className="search-bttn"><FontAwesomeIcon icon={faMagnifyingGlass} /> </div>
        </div>
        <div className="center-card">
            <FireExtinguisherCard />
        </div>
    </div>
  )
}
