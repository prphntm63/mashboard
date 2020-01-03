import { UPDATE_USER } from "./../actionTypes"

const initialUserState = {
    id : null,
    firstName : null,
    lastName : null,
    email : null
}

export default (state = initialUserState, action) => {
    let newState = {...state}

    switch(action.type) {
        case UPDATE_USER: {
            newState = action.userData
            return newState
        }
        default: {
            return newState
        }
    }
}