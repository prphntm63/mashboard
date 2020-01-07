import { ADD_DATA_POINT, SET_GRAPH_DATA } from "./../actionTypes"

let initialClientData = {
    "Mash" : [],
    "Ferm1" : [],
    "Ferm2" : [],
    "Still" : [],
    "Chiller" : []
}

export default (state = initialClientData, action) => {
    let newState = {...state}

    switch(action.type) {
        case ADD_DATA_POINT: {
            for (var processType in action.dataPoint) {
                newState[processType].push(action.dataPoint[processType])
            }
            return newState
        }
        case SET_GRAPH_DATA : {
            newState = action.graphData
            return newState
        }
        default: {
            return newState
        }
    }
}