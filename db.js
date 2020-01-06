const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const bcrypt = require('bcrypt');
const saltRounds = 10;

let db = {
    writeControllerData : function(controllerData) {
        let writePromises = []

        for (processKey in controllerData) {
            let writePromise = knex
            .insert(controllerData[processKey])
            .into(`${processKey}`)
            .then(() => {
                console.log(processKey)
            })
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
    }
}

module.exports = db;