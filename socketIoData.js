// const io = require('socket.io-client')
// const socket = io.connect('http://localhost:5000', {reconnect: true});
console.log(process.env.NODE_ENV === 'development', process.env.NODE_ENV, 'development')


if (process.env.NODE_ENV === 'development') {
    var socket = require('socket.io-client')('http://localhost:5000');
    // var socket = require('socket.io-client')('http://www.mashboard.app/');
} else {
    console.log('production build')
    var socket = require('socket.io-client')('https://www.mashboard.app/');
}

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

let currentTemp = {
    Mash : processSettings.Mash.setTemp,
    Ferm1 : processSettings.Ferm1.setTemp,
    Ferm2 : processSettings.Ferm2.setTemp,
    Still : processSettings.Still.setTemp
}

socket.on('connect', ()=> {
    console.log('connected to server')
    //Simulating reading data every x milliseconds
    setInterval(function () {
        let outData = {}
        let writeData = {}
        for (processSetting in processSettings) {
            currentTemp[processSetting] += (currentTemp[processSetting] <= processSettings[processSetting].setTemp ? processSettings[processSetting].hys*Math.random() : -processSettings[processSetting].hys*Math.random())


            if (processSetting != 'Chiller') {
                writeData = {
                    ...processSettings[processSetting],
                    // "currentTemp" : processSettings[processSetting].setTemp - processSettings[processSetting].hys + 2*processSettings[processSetting].hys*Math.random(),
                    "currentTemp" : currentTemp[processSetting],
                    // "setTemp" : processSettings[processSetting].setTemp
                }
        
            } else {
                writeData = {
                    ...processSettings[processSetting],
                    "currentFreq" : processSettings[processSetting].freq - 2 + 4*Math.random(),
                    "currentPower" : processSettings[processSetting].maxPower - 100 + 200*Math.random()
                }
            }
            outData[processSetting] = writeData
        }

        // console.log('Sending simulated Controller data at - ', new Date())
        socket.emit('controllerdata', outData);
    }, 5000);
})

socket.on('controller', (data)=> {
    // console.log('Controller got data from server at - ', new Date())
    processSettings = data
})






