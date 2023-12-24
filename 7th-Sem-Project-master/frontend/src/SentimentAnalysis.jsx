import React, { useState, useEffect } from 'react';

function SentimentAnalysis({ onSentimentAnalysis }) {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const analyzeSentiment = async (sentimentType) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiment(data.sentiment);
        setText(''); // Clear the text area after analysis
        onSentimentAnalysis(sentimentType);
      } else {
        console.error('Error analyzing sentiment:', response.statusText);
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <textarea
        placeholder="Enter text for sentiment analysis"
        value={text}
        onChange={handleTextChange}
      />
      <button onClick={analyzeSentiment} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {sentiment && (
        <div>
          <h3>Analysis Results</h3>
          <p>Sentiment: {sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
