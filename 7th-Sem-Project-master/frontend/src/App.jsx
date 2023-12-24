import React from 'react';
import SentimentAnalysis from './SentimentAnalysis';
import SentimentList from './SentimentList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Sentiment Analysis</h1>
      </header>
      <main>
        <SentimentAnalysis />
        <br />
        <br />
        <br />
        <SentimentList/>
      </main>
    </div>
  );
}

export default App;
