import { UPDATE_STREAMDATA } from "./../actionTypes"

// let initialStreamdataState = {
//     'Mash' : {
//         "batch" : null,
//         "setTemp" : 153,
//         "mode": "heat", //heat cool or off
//         "hys" : 4,
//         "stir" : true,
//         "stirSpeed" : 10,
//     },
//     'Ferm1' : {
//         "batch" : null,
//         "setTemp" : 77,
//         "mode": "cool", //cool or off
//         "hys" : 1,
//         "stir" : false,
//         "stirSpeed" : 10,
//     },
//     'Ferm2' : {
//         "batch" : null,
//         "setTemp" : 83,
//         "mode": "off", //cool or off
//         "hys" : 2,
//         "stir" : false,
//         "stirSpeed" : 10,
//     },
//     'Still' : {
//         "batch" : null,
//         "setTemp" : 182,
//         "mode": "heat", //heat, cool, or off
//         "hys" : 1,
//         "stir" : false,
//         "stirSpeed" : 10,
//     },
//     'Chiller' : {
//         "mode" : "run", //run or off
//         "freq" : 42,
//         "maxPower" : 1500
//     }
// }

let initialStreamdataState = {
    Mash : null,
    Ferm1 : null,
    Ferm2 : null,
    Still : null,
    Chiller : null
}

export default (state = initialStreamdataState, action) => {
    let newState = {...state}

    switch(action.type) {
        case UPDATE_STREAMDATA: {
            newState = action.streamData
            return newState
        }
        default: {
            return newState
        }
    }
}