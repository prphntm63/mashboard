import { UPDATE_CLIENT_STREAM_OUT } from "./../actionTypes"

let initialClientData = {
    'Mash' : {
        "batch" : '',
        "setTemp" : 153,
        "mode": "heat", //heat cool or off
        "hys" : 4,
        "stir" : true,
        "stirSpeed" : 10,
    },
    'Ferm1' : {
        "batch" : '',
        "setTemp" : 77,
        "mode": "cool", //cool or off
        "hys" : 1,
        "stir" : false,
        "stirSpeed" : 10,
    },
    'Ferm2' : {
        "batch" : '',
        "setTemp" : 83,
        "mode": "off", //cool or off
        "hys" : 2,
        "stir" : false,
        "stirSpeed" : 10,
    },
    'Still' : {
        "batch" : '',
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

export default (state = initialClientData, action) => {
    let newState = {...state}

    switch(action.type) {
        case UPDATE_CLIENT_STREAM_OUT: {
            newState = action.sendData
            return newState
        }
        default: {
            return newState
        }
    }
}