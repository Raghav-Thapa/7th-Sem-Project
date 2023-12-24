const mongoose = require('mongoose');

const SentimentSchema = new mongoose.Schema({
  text: String,
  sentiment: String,
  timestamp: { type: Date, default: Date.now },
});


const SentimentModel = mongoose.model("Sentiment", SentimentSchema)
module.exports = SentimentModel;
