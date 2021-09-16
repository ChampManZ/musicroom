const { Client } = require("pg")
require('dotenv').config()

const client = new Client({
    user: "postgres",
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME
})

client.connect()

const getFilm = (request, response) => {
    client.query("SELECT * FROM film", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows);
    })
}

module.exports = { getFilm }