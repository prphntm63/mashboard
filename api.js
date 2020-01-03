const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got API test request')
    res.status(200).json(
        req.user
    )
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.user)
        return next();
    }
    else {
      res.redirect('/')
    }
}

module.exports = router