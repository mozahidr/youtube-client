import React, { useState, useRef } from 'react';
import './Register.scss';
import logo from '../../images/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContaner } from 'react-toastify';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post('auth/register', { email, username, password });
      toast('Registration Successful!', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'foo-bar',
      });
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhre, Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email Address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="Username" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
