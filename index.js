const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;

// const db = require('./db');
const db = require('./db');
const path = require('path')

const port = process.env.PORT || '5000';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

if (process.env.NODE_ENV !== "production" ){
    require('dotenv').config();
}

passport.use(new LocalStrategy((username, password, done) => {
    db.authenticateUser(username, password)
    .then(user => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.getUser(id)
    .then(user => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
});

app.use(session({ 
    secret: "catsaremajesticanimals",
    name : "mashboard",
    proxy : true,
    resave : true,
    saveUninitialized : true
}));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

io.set('origins', '*:*');
io.on('connection', function(socket){

    socket.on('controllerdata', (controllerdata)=>{
        // console.log(`Controller Data Recieved from controller at -`, new Date())
        db.writeControllerData(controllerdata)
        .then((sendData) => {
            for (key in sendData) {
                sendData[key].ctime = new Date()
            }
            console.log('Sending new data to client...')
            socket.broadcast.emit('client', sendData)
        })
        .catch(err => {console.log(err)})
    });

    socket.on('clientdata', (data) => {
        // console.log(`Client Data Recieved from client at - ${new Date()}`)
        socket.broadcast.emit('controller', data)
    })

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
})

let api = require('./api')
app.use('/api', api)

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({"user" : null}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        db.getBatches()
        .then(batches => {
            return res.status(200).json({
                user : user,
                batches : batches
            })
        })
        
      });
    })(req, res, next);
});

app.post('/logout', function(req,res,next) {
    req.logout()
    res.status(200).json({id : null})
})

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
      res.redirect('/')
    }
}

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})