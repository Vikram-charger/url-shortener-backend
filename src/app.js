const express = require('express');
const cors = require('cors');
const urlshorter = require('./routes/urlshorter.routes.js')
const app = express();

app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://shorty.netlify.app"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json())


//routes
app.use('/api/shorturl', urlshorter)
app.use('/', urlshorter)
module.exports = app;