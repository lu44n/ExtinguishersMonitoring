import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import QRCodelink from 'qrcode';
import '../styles/Modal.css';

export const Modal = ({ isOpen, onClose, data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  useEffect(() => {
    if (isOpen) {
      setEditData(data); 
      setIsEditing(false); 
    }
  }, [isOpen, data]); 

  if (!isOpen) return null;

  const urlQRCode = `localhost:3000/consulta/extinguisher/${data.id}`;
  const qrcodeName = `qrcode-${data.id}.png`;

  const dataFormatter = (date) => {
    const dateObj = new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return dateObj;
  };

  const downloadQRCode = () => {
    QRCodelink.toDataURL(urlQRCode, { width: 500, margin: 3 }, function (err, url) {
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = qrcodeName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/extinguisher/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        alert('Extintor atualizado com sucesso!');
        setIsEditing(false);
        window.location.reload(); // Recarrega a página para refletir as alterações
      } else {
        alert('Erro ao atualizar o extintor.');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">Detalhes do Extintor</div>
        <div>
          {isEditing ? (
            <>
              <div className="edit-area">
                <label><strong>Tipo:</strong></label>
                <input type="text" name="tipo" value={editData.tipo} onChange={handleChange} />

                <label><strong>Capacidade:</strong></label>
                <input type="text" name="capacidade" value={editData.capacidade} onChange={handleChange} />

                <label><strong>Código do Fabricante:</strong></label>
                <input type="text" name="codigo_fabricante" value={editData.codigo_fabricante} onChange={handleChange} />

                <label><strong>Data de Fabricação:</strong></label>
                <input type="date" name="data_fabricacao" value={editData.data_fabricacao} onChange={handleChange} />

                <label><strong>Data de Validade:</strong></label>
                <input type="date" name="data_validade" value={editData.data_validade} onChange={handleChange} />

                <label><strong>Última Recarga:</strong></label>
                <input type="date" name="ultima_recarga" value={editData.ultima_recarga} onChange={handleChange} />

                <label><strong>Próxima Inspeção:</strong></label>
                <input type="date" name="proxima_inspecao" value={editData.proxima_inspecao} onChange={handleChange} />

                <label><strong>Status:</strong></label>
                <input type="text" name="status" value={editData.status} onChange={handleChange} />

                <label><strong>Localização:</strong></label>
                <input type="text" name="localizacao" value={editData.localizacao} onChange={handleChange} />

                <div className="save-area">
                    <button onClick={handleSave} className="save-btn">Salvar</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p><strong>ID:</strong> {data.id}</p>
              <p><strong>Tipo:</strong> {data.tipo}</p>
              <p><strong>Capacidade:</strong> {data.capacidade} litros</p>
              <p><strong>Código do Fabricante:</strong> {data.codigo_fabricante}</p>
              <p><strong>Data de Fabricação:</strong> {dataFormatter(data.data_fabricacao)}</p>
              <p><strong>Data de Validade:</strong> {dataFormatter(data.data_validade)}</p>
              <p><strong>Última Recarga:</strong> {dataFormatter(data.ultima_recarga)}</p>
              <p><strong>Próxima Inspeção:</strong> {dataFormatter(data.proxima_inspecao)}</p>
              <p><strong>Status:</strong> {data.status}</p>
              <p><strong>Localização:</strong> {data.localizacao}</p>
              <div className="qr-code-container">
                <p><strong>QRCode:</strong></p>
                <QRCode className="qr-code" value={urlQRCode} />
                <button onClick={downloadQRCode} className="download-btn">Baixar QRCode</button>
              </div>
            </>
          )}
        </div>
        <div className="modal-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
          <button onClick={onClose} className="close-modal-bttn">Fechar</button>
        </div>
      </div>
    </div>
  );
};