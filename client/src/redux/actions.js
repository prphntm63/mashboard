import { 
    UPDATE_USER, 
    UPDATE_STREAMDATA, 
    UPDATE_CLIENT_STREAM_OUT, 
    SELECT_COMPONENT,
    DESELECT_COMPONENT,
    ADD_DATA_POINT, 
    SET_GRAPH_DATA,
    SET_BATCHES,
    ADD_BATCH_DATA_POINT,
    SET_BATCH_DATA
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

export const selectComponent = (component) => ({
    type : SELECT_COMPONENT,
    component
})

export const deselectComponent = (component) => ({
    type : DESELECT_COMPONENT,
    component
})

export const deselectAll = () => ({
    type : DESELECT_COMPONENT
})

export const addDataPoint = (dataPoint) => ({
    type : ADD_DATA_POINT,
    dataPoint
})

export const setGraphData = (graphData) => ({
    type : SET_GRAPH_DATA,
    graphData
})

export const setBatches = (batches) => ({
    type : SET_BATCHES,
    batches
})

export const addBatchDataPoint = (batchId, dataPoint) => ({
    id : batchId,
    type : ADD_BATCH_DATA_POINT,
    dataPoint
})

export const setBatchData = (batchId, graphData) => ({
    id : batchId,
    type : SET_BATCH_DATA,
    graphData
})