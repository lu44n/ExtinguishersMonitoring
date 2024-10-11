import React from 'react'
import QRCode from 'react-qr-code'
import QRCodelink from 'qrcode'
import '../styles/Modal.css'

export const Modal = ({isOpen, onClose, data}) => {
    if (!isOpen) return null

    const urlQRCode = `localhost:3000/consulta/extinguisher/${data.id}`
    const qrcodeName = `qrcode-${data.id}.png`

    const dataFormatter = (date) => {
        const dateObj = new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        return dateObj
    }
    
    const downloadQRCode = () => {
        QRCodelink.toDataURL(urlQRCode, { width: 500, margin: 3 }, function (err, url) {
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = qrcodeName;
            document.body.appendChild(downloadLink)
            downloadLink.click();
            document.body.removeChild(downloadLink)
        });
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-title">Detalhes do Extintor</div>
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
                    <QRCode className="qr-code"
                        value={urlQRCode}
                    />
                    <button onClick={downloadQRCode} className="download-btn">
                        Baixar QRCode
                    </button>
                </div>
                <div className="close-modal-container">
                    <div className="close-modal-bttn" onClick={onClose}>Fechar</div>
                </div>
            </div>
        </div>
    )
}
