import { SET_BATCHES, ADD_BATCH_DATA_POINT, SET_BATCH_DATA } from "./../actionTypes"

let initialClientData = {}

export default (state = initialClientData, action) => {
    let newState = {...state}

    switch(action.type) {
        case SET_BATCHES : {
            for (var batchId in action.batches) {
                newState[batchId] = newState[batchId] || {...action.batches[batchId]}
            }
            return newState
        }
        case ADD_BATCH_DATA_POINT: {
            // for (var processType in action.dataPoint) {
            //     newState[action.id][processType].push(action.dataPoint[processType])
            // }
            return newState
        }
        case SET_BATCH_DATA : {
            newState[action.id] = action.graphData
            return newState
        }
        default: {
            return newState
        }
    }
}