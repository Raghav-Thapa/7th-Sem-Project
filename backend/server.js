const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const routes = require('./src/routes')


app.use(cors());

app.use("/api", routes)

app.use(bodyParser.json());
app.use("/assets/", express.static(process.cwd()+"/public/"));

// app.post('/predict', (req, res) => {
//   const inputData = req.body.inputData;

//   // Run a Python script as a subprocess to make predictions
//   const pythonProcess = spawn('python', [
//     path.join(__dirname, 'predict.py'), // Path to Python script
//     JSON.stringify(inputData), // Pass inputData as a JSON string
//   ]);

//   // Collect predictions from the Python script
//   let predictions = '';
//   pythonProcess.stdout.on('data', (data) => {
//     predictions += data.toString();
//   });

//   pythonProcess.on('close', (code) => {
//     if (code === 0) {
//       try {
//         const result = JSON.parse(predictions);
//         res.json({ predictions: result });
//       } catch (error) {
//         res.status(500).json({ error: 'Prediction failed' });
//       }
//     } else {
//       res.status(500).json({ error: 'Prediction process exited with an error' });
//     }
//   });
// });

server.listen(5000, 'localhost', (err) => {
  if (err) {
      console.log("Error listeninig to port")
  } else {
      console.log("Server is listening to port 5000")
      console.log("Press ctrl+c to disconnect server ")
  }
})
