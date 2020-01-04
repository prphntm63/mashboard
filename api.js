const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got API test request')
    res.status(200).json(req.user)
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "not authenticated"})
    }
}

module.exports = router