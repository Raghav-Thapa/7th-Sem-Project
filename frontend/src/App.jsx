import React, { useState} from 'react';
import axios from 'axios';
import loadingg from "./assets/loading.gif"
function App() {
  const [inputData, setInputData] = useState('');
  const [predictions, setPredictions] = useState('');
  const[loading, setLoading] = useState(false)

  // useEffect(() => {
  //   console.log(predictions);
  // }, [predictions]);


  const sendRequest = async () => {
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:5000/predict', { inputData });
      // const response = await axios.post('https://sentiment-test.raghavthapa3.repl.co/predict', { inputData });
      // console.log(response.data)
      const result = response.data.predictions;
      // console.log(result)
      setPredictions(result)

    } catch (error) {
      console.error(error);
      // setPredictions('');
    }
    finally{
      setLoading(false)
    }
  };

  // console.log(predictions)
  return (
    <div className="App">
      <h1>Sentiment Analysis Of Movie Review</h1>
      <textarea className='textareaa'
        placeholder="Enter text for sentiment analysis"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></textarea>
      <button className='analyzebtn' onClick={sendRequest}>Analyze</button><br/>
      {loading && (
        <img src={loadingg} height={500} width={660} alt="" className="showimage" />
                        )}
      {predictions && (
        <div>
          <h2>Reviews:</h2>

          <h4>{inputData} <br/> Sentiment : ({predictions}) </h4> 
          
          
          {/* <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
}

export default App;
