import React, { useState } from 'react';
import '../styles/DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const [deletedId, setDeletedId] = useState('');

  const handleDelete = async () => {
    if (deletedId) {
      try {
        const response = await fetch(`http://localhost:4000/api/extinguisher/${deletedId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(deletedId); 
          onClose(); 
          window.location.reload(); 
        } else {
          const data = await response.json();
          console.error(data.message);
          alert('Erro ao deletar extintor: ' + data.message);
        }
      } catch (error) {
        console.error('Erro ao deletar extintor:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Deletar Extintor</h2>
        <div className="input-container">
            <input
            type="text"
            className="modal-input"
            placeholder="ID do Extintor"
            value={deletedId}
            onChange={(e) => setDeletedId(e.target.value)}
            />
        </div>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="modal-button">Confirmar</button>
          <button onClick={onClose} className="modal-button cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
