import React, { useState, useEffect } from 'react';
import SentimentAnalysis from './SentimentAnalysis';
import ShowSentiment from './showSentiments';

function SentimentList() {
  const [positiveSentiments, setPositiveSentiments] = useState([]);
  const [negativeSentiments, setNegativeSentiments] = useState([]);
  const [positiveCount, setPositiveCount] = useState(0); // Initialize counts to 0
  const [negativeCount, setNegativeCount] = useState(0);

  useEffect(() => {
    async function fetchSentiments() {
      try {
        const response = await fetch('http://localhost:5000/sentiments');
        if (response.ok) {
          const data = await response.json();
          setPositiveSentiments(data.positiveSentiments);
          setNegativeSentiments(data.negativeSentiments);
          setPositiveCount(data.positiveSentiments.length); // Update counts from fetched data
          setNegativeCount(data.negativeSentiments.length);
        } else {
          console.error('Error fetching sentiments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching sentiments:', error);
      }
    }

    fetchSentiments();
  }, []);

  const updateSentimentCounts = (sentimentType) => {
    if (sentimentType === 'Positive') {
      setPositiveCount(positiveCount + 1);
    } else if (sentimentType === 'Negative') {
      setNegativeCount(negativeCount + 1);
    }
  };



  return (
    <div className= "row" style={{ display:"flex"}} >
      <div className="column" style={{marginRight:"300px"}}>
      <h2>Total positive sentiments: ({positiveCount})</h2>
      <h3>Positive Sentiments</h3>
      <ul>
        {positiveSentiments.map((sentiment) => (
          <li key={sentiment._id}>{sentiment.text}</li>
        ))}
        
      </ul>
      </div>

      <div className="column">
      <h2>Total negative sentiments: ({negativeCount})</h2>
      <h3>Negative Sentiments </h3>
      <ul>
        {negativeSentiments.map((sentiment) => (
          <li key={sentiment._id}>{sentiment.text}</li>
        ))}

     
      </ul>
       {/* Add SentimentAnalysis component and pass the update function */}
       {/* <SentimentAnalysis onSentimentAnalysis={updateSentimentCounts} /> */}
       {/* <showSentiment/> */}
       {/* <ShowSentiment/> */}
       </div>
    </div>
  );
}

export default SentimentList;
