const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/test', (req, res) => {
    console.log('got API test request')
    res.status(200).json({"success" : true})
})

module.exports = router