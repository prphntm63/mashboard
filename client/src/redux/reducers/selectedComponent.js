import { SELECT_COMPONENT, DESELECT_COMPONENT, DESELECT_ALL } from "./../actionTypes"

const initialSelectedComponentState = {}

export default (state = initialSelectedComponentState, action) => {
    let newState = {...state}

    switch(action.type) {
        case SELECT_COMPONENT: {
            Object.keys(newState).forEach(item => newState[item] = false)
            newState[action.component] = true
            return newState
        }
        case DESELECT_COMPONENT: {
            // delete newState[action.component]
            // if (Object.keys(newState).length) {
            //     newState[Object.keys(newState).slice(-1).pop()] = true
            // }
            newState = {}
            return newState
        }
        case DESELECT_ALL: {
            newState = {}
            return newState
        }
        default: {
            return newState
        }
    }
}