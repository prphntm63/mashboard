import { 
    UPDATE_USER, 
    UPDATE_STREAMDATA, 
    UPDATE_CLIENT_STREAM_OUT 
} from './actionTypes'

export const updateUser = (userData) => ({
    type : UPDATE_USER,
    userData
})

export const updateStreamdata = (streamData) => ({
    type : UPDATE_STREAMDATA,
    streamData
})

export const updateClientStreamOut = (sendData) => ({
    type : UPDATE_CLIENT_STREAM_OUT,
    sendData
})