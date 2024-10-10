import React, { useState } from 'react'
import '../styles/FireExtinguisherCard.css'
import extintor_icon from '../assets/extintor_icon.png'
import { Modal } from './Modal'

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
        <button className="more-info-button" onClick={handleOpenModal}>VER MAIS</button>

        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={{
          id,
          tipo,
          capacidade,
          codigo_fabricante,
          data_fabricacao,
          data_validade,
          ultima_recarga,
          proxima_inspecao,
          status,
          localizacao,
        }}
      />
    </div>

  )
}
