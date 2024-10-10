import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FireExtinguisherCard } from '../components/FireExtinguisherCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Consulta.css'

export const Consulta = () => {
    const [extinguisherId, setExtinguisherId] = useState('');
    const [extinguisherData, setExtinguisherData] = useState(null);

    const handleSearch = async () => {
        if (!extinguisherId) return; 

        try {
            const response = await fetch(`http://localhost:4000/api/extinguisher/${extinguisherId}`);
            if (!response.ok) {
                throw new Error('Extintor não encontrado');
            }
            const data = await response.json();
            setExtinguisherData(data); 
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar o extintor: ' + error.message);
        }
    };
  return (
    <div>
        <Navbar />
        <div className="primary-consulta">
            <div className="consultar-title-container">
                <div className="title-consulta">Consulta de Extintores | Metrô SP</div>
            </div>
            <div className="div-search-extinguisher">
                <input 
                type="text" 
                className="search-extinguisher" 
                placeholder="Insira o ID do Extintor" 
                value={extinguisherId}
                onChange={(e) => setExtinguisherId(e.target.value)}
                /> 
                <div className="search-bttn" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                </div>
            </div>
            <div className="center-card">
                {extinguisherData && (
                    <FireExtinguisherCard
                        id={extinguisherData.id}
                        tipo={extinguisherData.tipo}
                        capacidade={extinguisherData.capacidade}
                        codigo_fabricante={extinguisherData.codigo_fabricante}
                        data_fabricacao={extinguisherData.data_fabricacao}
                        data_validade={extinguisherData.data_validade}
                        ultima_recarga={extinguisherData.ultima_recarga}
                        proxima_inspecao={extinguisherData.proxima_inspecao}
                        status={extinguisherData.status}
                        localizacao={extinguisherData.localizacao}
                    />
                )}
            </div>
        </div>
        <Footer />
    </div>
  )
}
