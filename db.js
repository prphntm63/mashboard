const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)

const db = {

}

module.exports = db