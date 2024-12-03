import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import metro_logo from '../assets/metro_logo.png';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  }

  return (
    <div className="primary-login">
      <div className='container'>
        <div className="header">
          <div className="text">Login | Admin</div> <img src={metro_logo} alt="" className="metrologo" draggable={false}/>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" draggable={false}/>
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" draggable={false}/>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot-password">Lost Password? <span onClick={handleForgotPassword}>Click Here!</span></div>
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>Submit</div>
        </div>
      </div>
    </div>
  );
}
