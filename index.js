  
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db.js');
const path = require('path')

const app = express()
const port = process.env.PORT || '5000';

app.use(session({ 
    secret: "catsaremajesticanimals",
    name : "mashboard",
    proxy : true,
    resave : true,
    saveUninitialized : true
}));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

let api = require('./api')
app.use('/api', api)

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})