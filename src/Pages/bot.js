import React, { useState } from 'react';
import axios from 'axios';

function Bot() {
  const [question, setQuestion] = useState('');
  const [interactions, setInteractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ask', { question });
      const newInteraction = { user: question, bot: response.data.answer };
      setInteractions((prevInteractions) => [...prevInteractions, newInteraction]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (question.trim() !== '') {
        handleSubmit(event);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kilimo</h1>
        <div className="interactions">
          {interactions.map((interaction, index) => (
            <div key={index} className="interaction">
              <p className="user-message">{interaction.user}</p>
              <p className="bot-message">{interaction.bot}</p>
              {index !== interactions.length - 1 && <div className="divider"></div>}
            </div>
          ))}
          {isLoading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Generating response...</p>
          </div>
        )}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask a question about agriculture.../Uliza shwali kuhusu kilimo..."
            value={question}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" disabled={!question}>Ask/Uliza</button>
        </form>
      </header>
    </div>
  );
}

export default Bot;
