const express = require('express');
const urlshorter = require('./routes/urlshorter.routes.js')
const app = express();

app.use(express.json())

//routes
app.use('/api/shorturl', urlshorter)
app.use('/', urlshorter)
module.exports = app;