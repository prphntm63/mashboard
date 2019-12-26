import { UPDATE_USER, UPDATE_STREAMDATA } from './actionTypes'

export const updateUser = (userData) => ({
    type : UPDATE_USER,
    userData
})

export const updateStreamdata = (streamData) => ({
    type : UPDATE_STREAMDATA,
    streamData
})