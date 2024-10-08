import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css'

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/")
  }
  return (
    <div className="passwordMessage">
      Entre em contato com o&nbsp;<span>Administrador Responsável.</span>
      <div className="returnBttn" onClick={handleReturn}>Voltar</div>
    </div>
  )
}
