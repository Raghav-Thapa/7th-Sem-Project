const express = require('express')
const app = express.Router()

// const authRoutes = require("./auth.routes")
const sentimentRoutes = require("./sentiment.routes")


// app.use("/auth",authRoutes);
app.use("/sentiment",sentimentRoutes);


module.exports = app;