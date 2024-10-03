import React from 'react'
import '../styles/Navbar.css'

export const Navbar = () => {
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
          <li>Exit</li>
        </ul>
      </div>
    </nav>
  )
}
