import React from 'react';
import './Login.scss';
import logo from '../../images/logo.png';

export const Login = () => {
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="loginButton">Sign In</button>
          <span>New to Netflix? <b>Sign Up now.</b></span>
          <small>This page is protected by Google reCAPTCHA to ensure you're not a robot</small>
        </form>
      </div>
    </div>
  );
};
