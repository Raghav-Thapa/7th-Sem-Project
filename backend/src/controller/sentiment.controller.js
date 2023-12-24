const SentimentService = require("../services/sentiment.service.js");
const slugify = require("slugify")
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const express = require('express');
const app = express();
app.use(bodyParser.json());

class SentimentController {
  _svc;

  constructor() {
    this._svc = new SentimentService();
  }

//   listAllSentiments = async (req, res, next) => {
//     try {
//       let paging = {
//         totalNoOfRows: await this._svc.getAllCount(),
//         perPage: req.query.perPage ? Number(req.query.perPage) : 10,
//         currentPage: req.query.page ? Number(req.query.page) : 1,
//       };

//       let data = await this._svc.getAllSentiments(paging);
//       res.json({
//         result: data,
//         status: true,
//         msg: "Sentiment Data fetched",
//         meta: paging,
//       });
//     } catch (exception) {
//       next(exception);
//     }
//   };


  storeSentiment = async (req, res, next) => {
    try {
        let inputData = req.body;
  
        // Run a Python script as a subprocess to make predictions
        const pythonProcess = spawn('python', [
          path.join(__dirname, '../../predict.py'), // Path to Python script
          JSON.stringify(inputData), // Pass inputData as a JSON string
        ]);
      
        // Collect predictions from the Python script
        let predictions = '';
        pythonProcess.stdout.on('data', (data) => {
          predictions += data.toString();
        });
      
        pythonProcess.on('close', async (code) => {
          if (code === 0) {
            
              const result = JSON.parse(predictions);
              const response = await this._svc.createSentiment(result);;
              res.json({ predictions: response });
            
          } else {
            res.status(500).json({ error: 'Prediction process exited with an error' });
          }
        });
     

    } catch (exception) {
      next(exception);
    }
  };

//   updateSentiment = async (req, res, next) => {
//     try {
//       let data = req.body;
//       let room = await this._svc.getSentimentById(req.params.id);
//       let images = [];
//       if (req.files) {
//         images = req.files.map((item) => {
//           return item.filename;
//         });
//       }

//       data.images = [...room.images, ...images];

//       if (typeof data.attributes === "string") {
//         data.attributes = JSON.parse(data.attributes);
//       }

//       let validated = await this._svc.roomValidate(data);

//       if (validated.categories === "null") {
//         validated.categories = null;
//       } else {
//         validated.categories = validated.categories.split(",");
//       }

//       if (validated.brand === "null") {
//         validated.brand = null;
//       }

//       if (validated.sellerId === "null") {
//         validated.sellerId = null;
//       }

//       validated.afterDiscount =
//         validated.price - (validated.price * validated.discount) / 100;

//       let response = await this._svc.updateSentiment(validated, req.params.id);
//       res.json({
//         result: response,
//         msg: "Sentiment Updated successfully",
//         status: true,
//         meta: null,
//       });
//     } catch (exception) {
//       next(exception);
//     }
//   };
//   getSentimentById = async (req, res, next) => {
//     try {
//       let room = await this._svc.getSentimentById(req.params.id)

//       res.json({
//         result: room,
//         msg: "Sentiment fetched successfully",
//         status: true,
//         meta: null
//       })
//     } catch (except) {
//       next(except)
//     }
//   }

//   getSentimentBySlug = async (req, res, next) => {
//     try {
//       let room = await this._svc.getSentimentByFilter(
//         {
//           slug: req.params.slug,
//         },
//         {
//           perPage: 1,
//           currentPage: 1,
//         }
//       );

//       res.json({
//         result: room[0],
//         msg: "Sentiment fetched successfully",
//         status: true,
//         meta: null,
//       });
//     } catch (except) {
//       next(except);
//     }
//   };

//   deleteSentiment = async (req, res, next) => {
//     try {
//       let room = await this._svc.getSentimentById(req.params.id)
//       let del = await this._svc.deleteSentimentById(req.params.id);
//       res.json({
//         result: del,
//         msg: "Sentiment deleted successfully",
//         status: true,
//         meta: null
//       })
//     } catch (except) {
//       next(except)
//     }
//   }

//   getSentimentForHomePage = async (req, res, next) => {
//     try {
//       let filter = {
//         status: "active",
//       }
//       let paging = {
//         totalNoOfRows: await this._svc.getAllCount(filter),
//         perPage: req.query.perPage ? Number(req.query.perPage) : 100,
//         currentPage: req.query.page ? Number(req.query.page) : 1
//       }

//       let data = await this._svc.getSentimentByFilter(filter, paging);
//       res.json({
//         result: data,
//         msg: "Sentiment Data",
//         status: true,
//         meta: paging
//       })
//     } catch (except) {
//       next(except)
//     }
//   }
}
module.exports = SentimentController;