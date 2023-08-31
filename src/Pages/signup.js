import React, { useState } from 'react';
import Login from './login.js';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignUpForm, setSignUpForm] = useState(true);

  const navigate= useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
    };
    if (!username || !password || !email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const userData = { username, email, password };

    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/Home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    setSignUpForm(false);
    navigate('/login');
  };

  return (
    <div className='body'>
      {showSignUpForm ? (
        <div className="container">
          <div className="form-wrapper signup-form-container">
            <form onSubmit={handleFormSubmit} className="signup-form">
              <h2>Sign Up</h2>
              <input
                type="tel"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /><br /><br />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br /><br />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br /><br />
              <div>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label>Show Password</label>
              </div>
              <div>
              <button type="submit">Signup</button>
              </div>
              <p>
                Already have an account?{' '}
                <button onClick={handleLogin}>Login</button>
              </p>
              {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
