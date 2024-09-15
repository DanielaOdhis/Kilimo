import React, { useState } from 'react';
import axios from 'axios';
import Signup from './signup';
import {  useNavigate } from 'react-router-dom';

export default function Logins() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
    };
    axios.post('http://localhost:5000/api/login', { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('loggedInUser', JSON.stringify(formData.id));
        navigate('/Home');
      })
      .catch((error) => {
        console.log(error);
        setError('No Account Found. Please try again.');
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    setShowLoginForm(false);
    navigate('/signup');
  };

  return (
    <div className="body">
      {showLoginForm ? (
        <div className="container">
        <div className="form-wrapper login-form-container">
          <form onSubmit={handleFormSubmit} className="login-form">
          <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/><br/>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/><br/>
            <div>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label>Show Password</label>
            </div>
            {error && <p className='error'>{error}</p>}
            <button type="submit">Login</button>
          </form>
          <div>
            <p>
               Don't have an account? <button onClick={handleSignup}>Sign up</button>
             </p>
          </div>
        </div>
        </div>
      ) : (
        <div>
          <Signup onSignUp={handleSignup} />
        </div>
      )}
    </div>
  );
}
