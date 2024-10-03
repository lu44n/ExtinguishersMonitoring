import React from 'react'
import '../styles/Login.css'

import user_icon from '../assets/person.png'
import password_icon from '../assets/password.png'

export const Login = () => {
  return (
    <div className = 'container'>
        <div className="header">
            <div className="text">Login | Admin</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Username' />
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password' />
            </div>
        </div>
        <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
        <div className="submit-container">
            <div className="submit">Submit</div>
        </div>
    </div>
  )
}