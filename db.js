const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)

let db = {
    writeControllerData : function(controllerData) {
        let writePromises = []

        for (processKey in controllerData) {
            let writePromise = knex
            .insert(controllerData[process])
            .into(`${process}`)
            .catch(err => {
                console.log(err)
            })

            writePromises.push(writePromise)
        }

        return Promise.all(writePromises)
        .then(() => {
            return controllerData
        })
    },

    createUser : function(userParams) {
        return knex
        .insert(userParams)
        .into('Users')
        .then(users => {
            return users.length ? users[0] : null
        })
    }
}

module.exports = db;