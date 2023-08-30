import React from 'react';
import './App.css';
import Bot from './Pages/bot.js';
import Home from './Pages/Home.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Bot" element={<Bot />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
