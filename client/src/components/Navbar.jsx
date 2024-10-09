import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css'

export const Navbar = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/")
  }

  const handleHome = () => {
    navigate("/home")
  }

  const handleConsulta = () => {
    navigate("/consulta")
  }

  const handleGerenciar = () => {
    navigate("/gerenciar")
  }

  return (
    <nav className="navbar">
      <div className="navbar-left"> 
        <span>Admin | Metrô SP</span>
      </div>
      <div className="navbar-right">
        <ul>
          <li onClick={handleHome}>Home</li>
          <li onClick={handleConsulta}>Consulta</li>
          <li onClick={handleGerenciar}>Gerenciar</li>
          <li onClick={handleExit}><FontAwesomeIcon icon={faRightFromBracket} /></li>
        </ul>
      </div>
    </nav>
  )
}
