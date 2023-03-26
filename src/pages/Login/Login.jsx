import React, { useContext, useState } from 'react';
import './Login.scss';
import logo from '../../images/logo.png';
import { AuthContext } from '../../AuthContext/AuthContext';
import { login } from '../../AuthContext/ApiCalls';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  const nav = () => {
    alert('Clicked');
    navigate('/register');
  }
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          <button className="loginButton" onClick={nav}>Sign Up</button>
        </div>
      </div>
      <div className="container">
        <form className="loginForm">
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <b>Sign Up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            robot
          </small>
        </form>
      </div>
    </div>
  );
};
