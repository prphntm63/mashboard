import { UPDATE_CLIENT_STREAM_OUT } from "./../actionTypes"

// let initialClientData = {
//     'Mash' : {
//         "batch" : '',
//         "setTemp" : 0,
//         "mode": "heat", //heat cool or off
//         "hys" : 0,
//         "stir" : true,
//         "stirSpeed" : 0,
//     },
//     'Ferm1' : {
//         "batch" : '',
//         "setTemp" : 0,
//         "mode": "cool", //cool or off
//         "hys" : 0,
//         "stir" : false,
//         "stirSpeed" : 0,
//     },
//     'Ferm2' : {
//         "batch" : '',
//         "setTemp" : 0,
//         "mode": "off", //cool or off
//         "hys" : 0,
//         "stir" : false,
//         "stirSpeed" : 0,
//     },
//     'Still' : {
//         "batch" : '',
//         "setTemp" : 0,
//         "mode": "heat", //heat, cool, or off
//         "hys" : 0,
//         "stir" : false,
//         "stirSpeed" : 0,
//     },
//     'Chiller' : {
//         "mode" : "run", //run or off
//         "freq" : 0,
//         "maxPower" : 0
//     }
// }

let initialClientData = {
    "Mash" : null,
    "Ferm1" : null,
    "Ferm2" : null,
    "Still" : null,
    "Chiller" : null
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