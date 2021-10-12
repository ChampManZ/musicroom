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

// const queueID = "dummy"

const showPIN = (requst, response) => {
    client.query("SELECT pin_a FROM pin_total", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const addPIN = (request, response) => {
    client.query(
        `INSERT INTO pin_total(pin_a) VALUES ${'ดัมมี้'}`,
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send("User added pin ID")
        }
    )
}

const deletePIN = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("DELETE FROM pin_total WHERE pin_a = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted pin ID: ${id}`)
    })
}

const getFirstRowPinQ = (request, response) => {
    client.query("SELECT pin_q FROM pin_total LIMIT 1", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const getFirstRowPinC = (request, response) => {
    client.query("SELECT pin_c FROM pin_total LIMIT 1", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const deleteColumnPinQ = (request, response) => {
    client.query("ALTER TABLE pin_total DROP COLUMN pin_q", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send("User deleted column pin_q")
    })
}

const deleteColumnPinC = (request, response) => {
    client.query("ALTER TABLE pin_total DROP COLUMN pin_c", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send("User deleted column pin_c")
    })
}

const showPinQ = (request, response) => {
    client.query("SELECT pin_q FROM pin_total", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const showPinC = (request, response) => {
    client.query("SELECT pin_c FROM pin_total", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const deletePinQ = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("DELETE FROM pin_total WHERE pin_q = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send("User deleted column pin_q")
    })
}

const createNewColQ = (request, response) => {
    client.query(`ALTER pin_total ADD ${'ดัมมี้'}_q varchar(255)`, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send("User deleted column pin_q")
    })
}

const createNewColC = (request, response) => {
    client.query(`ALTER pin_total ADD ${'ดัมมี้'}_c varchar(255)`, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send("User deleted column pin_q")
    })
}

module.exports = { showPIN, addPIN, deletePIN, getFirstRowPinC, getFirstRowPinQ, deleteColumnPinC, deleteColumnPinQ, showPinC, showPinQ, deletePinQ, createNewColQ, createNewColC }
