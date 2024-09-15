import React from 'react';
import './App.css';
import Bot from './Pages/bot.js';
import Home from './Pages/Home.js';
import Weather from './Pages/weather';
import Signup from './Pages/signup';
import Logins from './Pages/login';
import Landing from './Pages/landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Bot" element={<Bot />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Weather-Forecast" element={<Weather />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
