const express = require('express');
const { urlshorter, redirectUrl } = require('../controllers/urlshorter.controller')

const router = express.Router();

router.post('/', urlshorter)
router.get('/:shortId', redirectUrl)
module.exports = router;