import React, { useState } from 'react';
import '../styles/Modal.css';

const AddModal = ({ isOpen, onClose, onAdd }) => {
  const [newExtinguisher, setNewExtinguisher] = useState({
    tipo: '',
    capacidade: '',
    codigo_fabricante: '',
    data_fabricacao: '',
    data_validade: '',
    ultima_recarga: '',
    proxima_inspecao: '',
    status: '',
    localizacao: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExtinguisher({ ...newExtinguisher, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/extinguisher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExtinguisher),
      });

      if (response.ok) {
        const addedExtinguisher = await response.json();
        alert('Extintor adicionado com sucesso!');
        onAdd(addedExtinguisher); 
        onClose(); 
        window.location.reload();
      } else {
        alert('Erro ao adicionar o extintor.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o extintor:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">Adicionar Novo Extintor</div>
        <div className="edit-area">
          <label><strong>Tipo:</strong></label>
          <input type="text" name="tipo" value={newExtinguisher.tipo} onChange={handleChange} />

          <label><strong>Capacidade:</strong></label>
          <input type="text" name="capacidade" value={newExtinguisher.capacidade} onChange={handleChange} />

          <label><strong>Código do Fabricante:</strong></label>
          <input type="text" name="codigo_fabricante" value={newExtinguisher.codigo_fabricante} onChange={handleChange} />

          <label><strong>Data de Fabricação:</strong></label>
          <input type="date" name="data_fabricacao" value={newExtinguisher.data_fabricacao} onChange={handleChange} />

          <label><strong>Data de Validade:</strong></label>
          <input type="date" name="data_validade" value={newExtinguisher.data_validade} onChange={handleChange} />

          <label><strong>Última Recarga:</strong></label>
          <input type="date" name="ultima_recarga" value={newExtinguisher.ultima_recarga} onChange={handleChange} />

          <label><strong>Próxima Inspeção:</strong></label>
          <input type="date" name="proxima_inspecao" value={newExtinguisher.proxima_inspecao} onChange={handleChange} />

          <label><strong>Status:</strong></label>
          <input type="text" name="status" value={newExtinguisher.status} onChange={handleChange} />

          <label><strong>Localização:</strong></label>
          <input type="text" name="localizacao" value={newExtinguisher.localizacao} onChange={handleChange} />

          <div className="save-area">
            <button onClick={handleAdd} className="save-btn">Adicionar</button>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="close-modal-bttn">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
