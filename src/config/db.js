require('dotenv').config()

const knext = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USERNAME || 'root',
        database: process.env.DB_DATABASE || 'api_challenge_node'
    }
})

module.exports = knext