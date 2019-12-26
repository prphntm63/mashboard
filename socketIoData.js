// const io = require('socket.io-client')
// const socket = io.connect('http://localhost:5000', {reconnect: true});

var socket = require('socket.io-client')('http://localhost:5000');

let processSettings = {
    'Mash' : {
        "batch" : null,
        "setTemp" : 153,
        "mode": "heat", //heat cool or off
        "hys" : 4,
        "stir" : true,
        "stirSpeed" : 10,
    },
    'Ferm1' : {
        "batch" : null,
        "setTemp" : 77,
        "mode": "cool", //cool or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
    },
    'Ferm2' : {
        "batch" : null,
        "setTemp" : 83,
        "mode": "off", //cool or off
        "hys" : 2,
        "stir" : false,
        "stirSpeed" : 10,
    },
    'Still' : {
        "batch" : null,
        "setTemp" : 182,
        "mode": "heat", //heat, cool, or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
    },
    'Chiller' : {
        "mode" : "run", //run or off
        "freq" : 42,
        "maxPower" : 1500
    }
}

socket.on('connect', ()=> {
    console.log('connected to server')
    //Simulating reading data every x milliseconds
    setInterval(function () {
        let outData = {}
        let writeData = {}
        for (processSetting in processSettings) {
            if (processSetting != 'Chiller') {
                writeData = {
                    ...processSettings[processSetting],
                    "currentTemp" : processSettings[processSetting].setTemp - processSettings[processSetting].hys + 2*processSettings[processSetting].hys*Math.random(),
                    "setTemp" : processSettings[processSetting].setTemp + 1
                }
                delete writeData.id
                delete writeData.ctime
        
            } else {
                writeData = {
                    ...processSettings[processSetting],
                    "currentFreq" : processSettings[processSetting].freq - 2 + 4*Math.random(),
                    "currentPower" : processSettings[processSetting].maxPower - 100 + 200*Math.random()
                }
                delete writeData.id
                delete writeData.ctime
            }
            outData[processSetting] = writeData
        }

        console.log('Sending simulated Controller data at - ', new Date())
        socket.emit('controllerdata', outData);
    }, 5000);
})

socket.on('controller', (data)=> {
    console.log('Controller got data from server - ', data)
})






