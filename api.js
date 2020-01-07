const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.get('/test', ensureAuthenticated, (req, res) => {
    console.log('got API test request')
    res.status(200).json(req.user)
})

router.get('/batch', ensureAuthenticated, (req,res) => {
    db.getBatches()
    .then(batches => {
        res.status(200).json({
            user : req.user,
            batches : batches
        })
    })
})

router.get('/batch/:id', ensureAuthenticated, (req,res) => {
    db.getBatch(req.params.id)
    .then(batch => {
        res.status(200).json({
            user : req.user,
            batch : batch
        })
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({"error" : "not authenticated"})
    }
}

module.exports = router