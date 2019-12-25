const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)
const fetch = require('node-fetch')
const processes = ['Mash', 'Ferm1', 'Ferm2', 'Still', 'Chiller']
const numDaysHistoricData = 1

// setInterval(generateDatapoint, 1000)
console.log('starting generateDatapoint script')
let initialSetup = true

setInterval(generateDatapoint, 2000)

function generateDatapoint() {
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
        processes.forEach(process => {
            processesPromises.push(knex.from(`${process}`).select('*').then(tableRows => {return tableRows[0]}))
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
        if (initialSetup) {
            console.log('Running initial setup')
            for (processSetting in processSettings) {
                knex(`${processSetting}`)
                .where('ctime', '>=', `${new Date(new Date().getTime() - numDaysHistoricData*24*60*60*1000).toISOString()}`)
                .delete()
                .return(processSetting)
                .then((processSetting) => {
                    console.log(processSetting)
                    for (let timestep=numDaysHistoricData*24*60; timestep >0 ; timestep--) {
                        if (processSetting != 'Chiller') {
                            let writeData = {
                                ...processSettings[processSetting],
                                "ctime" : new Date(new Date().getTime() - timestep*1000*60).toISOString(),
                                "currentTemp" : processSettings[processSetting].setTemp - processSettings[processSetting].hys + 2*processSettings[processSetting].hys*Math.random()
                            }
                            delete writeData.id
                            knex(`${processSetting}`).insert(writeData)
                            .catch(err => {
                                console.log(err)
                            })
                        } else {
                            knex(`${processSetting}`).insert({
                                ...processSettings[processSetting],
                                "ctime" : new Date(new Date().getTime() - timestep*1000*60).toISOString(),
                                "currentFreq" : processSettings[processSetting].freq - 2 + 4*Math.random(),
                                "currentPower" : processSettings[processSetting].maxPower - 100 + 200*Math.random()
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        }
                    }
                })
            }

            initialSetup = false;
        } else {
            for (processSetting in processSettings) {
                if (processSetting != 'Chiller') {
                    let writeData = {
                        ...processSettings[processSetting],
                        "currentTemp" : processSettings[processSetting].setTemp - processSettings[processSetting].hys + 2*processSettings[processSetting].hys*Math.random(),
                        "setTemp" : processSettings[processSetting].setTemp + 1
                    }
                    delete writeData.id
                    delete writeData.ctime
                    knex(`${processSetting}`)
                    .insert(writeData)
                    .then(() => {
                        // console.log(`Generated Data Point @ Seconds: ${new Date().getSeconds()}`)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    let writeData = {
                        ...processSettings[processSetting],
                        "currentFreq" : processSettings[processSetting].freq - 2 + 4*Math.random(),
                        "currentPower" : processSettings[processSetting].maxPower - 100 + 200*Math.random()
                    }
                    delete writeData.id
                    delete writeData.ctime
                    knex(`${processSetting}`)
                    .insert(writeData)
                    .then(() => {
                        // console.log(`Generated Data Point @ Seconds: ${new Date().getSeconds()}`)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        }
    })

}

// function createSettings() {
//     return [
//       {
//         "id": "mash",
//         "params" : JSON.stringify({
//           "batch" : "testBatch1",
//           "setTemp" : 153,
//           "mode": "heat", //heat cool or off
//           "hys" : 4,
//           "stir" : true,
//           "stirSpeed" : 10,
//         })
//       },
//       {
//         "id": "ferm1",
//         "params" : JSON.stringify({
//           "batch" : "testBatch2",
//           "setTemp" : 77,
//           "mode": "cool", //cool or off
//           "hys" : 2,
//           "stir" : false,
//           "stirSpeed" : 10,
//         })
//       },
//       {
//         "id": "ferm2",
//         "params" : JSON.stringify({
//           "batch" : "testBatch3",
//           "setTemp" : 85,
//           "mode": "off", //cool or off
//           "hys" : 2,
//           "stir" : false,
//           "stirSpeed" : 0,
//         })
//       },
//       {
//         "id": "still",
//         "params" : JSON.stringify({
//           "batch" : "testBatch4",
//           "setTemp" : 182,
//           "mode": "heat", //heat, cool, or off
//           "hys" : 1,
//           "stir" : false,
//           "stirSpeed" : 10,
//         })
//       },
//       {
//         "id": "chiller",
//         "params" : JSON.stringify({
//           "mode" : "run", //run or off
//           "freq" : 42,
//           "maxPower" : 1500
//         })
//       }
//     ]
//   }