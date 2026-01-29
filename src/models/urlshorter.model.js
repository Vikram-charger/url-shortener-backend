const mongoose = require('mongoose');

let urlSchema = new mongoose.Schema({
    "longUrl":{
        type: String,
        unique: true,
        index: true,
        required: true
    },
    "shortId":{
        type: String,
        unique: true,
        index: true,
        required: true
    },
    "clickCount":{
        type: Number,
        default: 0
    },
    "expiresAt":{
        type: Date,
        default: null
    }
},{
    "timestamps": true
})

module.exports = mongoose.model('url', urlSchema, 'urlshorter_meta')