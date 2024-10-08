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
  return (
    <nav className="navbar">
      <div className="navbar-left"> 
        <span>Admin | Metrô SP</span>
      </div>
      <div className="navbar-right">
        <ul>
          <li>Home</li>
          <li>Consulta</li>
          <li>Gerenciar</li>
          <li onClick={handleExit}><FontAwesomeIcon icon={faRightFromBracket} /></li>
        </ul>
      </div>
    </nav>
  )
}
