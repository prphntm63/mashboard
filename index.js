const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// const db = require('./db');
const db = require('./db');
const path = require('path')

const port = process.env.PORT || '5000';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

io.on('connection', function(socket){
    console.log('new client connected')

    socket.on('controllerdata', (controllerdata)=>{
        console.log(`Controller Data Recieved from controller at -`, new Date())
        db.writeControllerData(controllerdata)
        .then((sendData) => {
            console.log('Sending data to client...')
            socket.broadcast.emit('client', sendData)
        })
    });

    socket.on('clientdata', (data) => {
        console.log(`Client Data Recieved from client -`, data)
        socket.broadcast.emit('controller', 'Test Socket Message from Server to Controller')
    })

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
})

let api = require('./api')
app.use('/api', api)

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})