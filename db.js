const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const processTypes = ['Mash', 'Ferm1', 'Ferm2', 'Still', 'Chiller']

let db = {
    writeControllerData : function(controllerData) {
        let writePromises = []

        for (processKey in controllerData) {
            if (controllerData[processKey].batch === '') {
                controllerData[processKey].batch = null
            }

            let writePromise = knex
            .insert(controllerData[processKey])
            .into(`${processKey}`)
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
    },

    getUser : function(userId) {
        return knex('Users')
        .select('*')
        .where({id : userId})
        .then(userRows => {
            return userRows[0]
        })
    },

    authenticateUser : function(username, password) {
        return knex('Users')
        .select('*')
        .where({email : username})
        .then(userRows => {
            return userRows[0]
        })
        .then(user => {
            let passwordPromise = new Promise((resolve, reject) => {
                bcrypt.compare(password, user.hashedPassword, function(err, res) {
                    if (err) reject(err)

                    let userInfo = false

                    if (res) {
                        userInfo = {...user}
                        delete userInfo.hashedPassword
                    }

                    resolve(userInfo)
                });
            })

            return passwordPromise
        })
    },

    getBatches : function() {
        return knex
        .from('Batches')
        .select('id', 'name', 'description', 'ctime')
        .then(batches => {
            let batchesObject = {};
            batches.forEach(batch => {
                batchesObject[batch.id] = batch
            })

            return batchesObject
        })
    },

    getBatch : function(batchId) {
        return knex('Batches')
        .select('*')
        .where({id : batchId})
        .then(batchRows => {
            return batchRows[0]
        })
        .then(batch => {
            let processPromises = []

            processTypes.forEach(processType => {
                processPromises.push(
                    knex(processType)
                    .return('*')
                    .where({"batch" : batchId})
                    .then(processDataRows => {
                        return processDataRows[0]
                    })
                )
            })

            return Promise.all(processPromises)
            .then(processPromiseData => {
                processPromiseData.forEach((processData, idx) => {
                    batch[processTypes[idx]] = processData
                })

                return batch
            })
        })
    },

    addBatch : function(batchData) {

        return knex('Batches')
        .insert(batchData)
        .returning('*')
        .then(batch => {
            return batch
        })
    }
}

module.exports = db;