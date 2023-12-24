const express = require ('express')
const { sentimentCtrl } = require('../controller')
const app = express.Router()


const uploadPath =(req,res,next) => {
    req.uploadPath ="./public/sentiments/"
    next()

}

app.post('/predict', sentimentCtrl.storeSentiment)
app.get('/',)





module.exports = app;