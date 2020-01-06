const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)
const fetch = require('node-fetch')
const processes = ['Mash', 'Ferm1', 'Ferm2', 'Still', 'Chiller']
const numDaysHistoricData = 1
const dataSpacing = 5 //seconds

setTimeout(generateDatapointHistory, 2000)

function generateDatapointHistory() {
    console.log('generating data point')
    // Check if server is running
    fetch('http://localhost:5000/api/test')
    .then(response => {
        if (response.status != 200) {
            process.exit()
        }
    })
    .then(() => {
        let processesPromises = []
        processes.forEach(operation => {
            processesPromises.push(knex.from(`${operation}`).select('*').then(tableRows => {return tableRows[0]}))
        })

        return Promise.all(processesPromises)
    })
    .then(processesSettingArray => {
        let processSettings = {}
        for (let idx=0; idx<processes.length; idx++) {
            processSettings[processes[idx]] = processesSettingArray[idx]
        }
        return processSettings
    })
    .then(processSettings => {
        console.log('Dev Mode - Generating Historic Data')
        for (processSetting in processSettings) {
            knex(`${processSetting}`)
            .where('ctime', '>=', `${new Date(new Date().getTime() - numDaysHistoricData*24*60*60*1000).toISOString()}`)
            .delete()
            .return(processSetting)
            .then((processSetting) => {
                return 
                let processPromises = []
                for (let timestep=numDaysHistoricData*24*60*(60/dataSpacing); timestep >0 ; timestep--) {
                    if (processSetting != 'Chiller') {
                        let writeData = {
                            ...processSettings[processSetting],
                            "ctime" : new Date(new Date().getTime() - timestep*1000*60*(60/dataSpacing)).toISOString(),
                            "currentTemp" : processSettings[processSetting].setTemp - processSettings[processSetting].hys + 2*processSettings[processSetting].hys*Math.random()
                        }
                        delete writeData.id
                        
                        let processPromise = knex(`${processSetting}`).insert(writeData)
                        .catch(err => {
                            console.log(err)
                        })

                        processPromises.push(processPromise)
                    } else {
                        let processPromise = knex(`${processSetting}`).insert({
                            ...processSettings[processSetting],
                            "ctime" : new Date(new Date().getTime() - timestep*1000*60*(60/dataSpacing)).toISOString(),
                            "currentFreq" : processSettings[processSetting].freq - 2 + 4*Math.random(),
                            "currentPower" : processSettings[processSetting].maxPower - 100 + 200*Math.random()
                        })
                        .catch(err => {
                            console.log(err)
                        })

                        processPromises.push(processPromise)
                    }
                }

                return Promise.all(processPromises)
            })
        }
    })
    .then(() => {
        console.log(`Historic Data Succesfully Written for ${numDaysHistoricData} day at ${dataSpacing} second interval!`)
    })
}