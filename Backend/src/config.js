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

const queueID = "dummy"

const showPIN = (requst, response) => {
    client.query("SELECT * FROM pin_total", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const addPIN = (request, response) => {
    const { pin } = request.body
    client.query(
        "INSERT INTO pin_total(pin_id) VALUES ($1)",
        [pin],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User added pin ID: ${result.id}`)
        }
    )
}

const deletePIN = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("DELETE FROM pin_total WHERE pin_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted pin ID: ${id}`)
    })
}

// const createQueueTable = (request, response) => {
//     var sql = `CREATE TABLE ${dummy}_q(youid) SERIAL PRIMARY KEY`
//     client.query(sql, (error, results) => {
//         if (error) {
//             throw error
//         } else {
//             console.log("Create successful")
//         }
//     })
// }

module.exports = { showPIN, addPIN, deletePIN }
