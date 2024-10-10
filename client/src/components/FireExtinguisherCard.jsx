import React from 'react'
import '../styles/FireExtinguisherCard.css'
import extintor_icon from '../assets/extintor_icon.png';

export const FireExtinguisherCard = () => {
  return (
    <div className="fire-extinguisher-card">
        <div className="icon">
            <img src={extintor_icon} alt=""/>
        </div>
        <div className="details">
            <div className="detail"><strong>ID:</strong> </div>
            <div className="detail"><strong>Tipo:</strong> </div>
            <div className="detail"><strong>Localização:</strong> </div>
            <div className="detail"><strong>Status:</strong> </div>
        </div>
        <button className="more-info-button">VER MAIS</button>
    </div>

  )
}
