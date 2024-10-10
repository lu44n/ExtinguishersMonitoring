import React from 'react'
import '../styles/FireExtinguisherCard.css'
import extintor_icon from '../assets/extintor_icon.png';

export const FireExtinguisherCard = ({
    id,
    tipo,
    capacidade,
    codigo_fabricante,
    data_fabricacao,
    data_validade,
    ultima_recarga,
    proxima_inspecao,
    status,
    localizacao
}) => {
  return (
    <div className="fire-extinguisher-card">
        <div className="icon">
            <img src={extintor_icon} alt=""/>
        </div>
        <div className="details">
            <div className="detail"><strong>ID:</strong> {id} </div>
            <div className="detail"><strong>Tipo:</strong> {tipo}</div>
            <div className="detail"><strong>Localização:</strong> {localizacao}</div>
            <div className="detail"><strong>Status:</strong> {status}</div>
        </div>
        <button className="more-info-button">VER MAIS</button>
    </div>

  )
}
