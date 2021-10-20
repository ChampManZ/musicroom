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

// Show PIN
const showPIN = (requst, response) => {
    client.query("SELECT * FROM pin_total ORDER BY pin_a ASC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

// Show single PIN
const showParticularPin = (request, response) => {
    const pin_a = parseInt(request.params.pin_a)
    client.query("SELECT * FROM pin_total WHERE pin_a = $1", [pin_a], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

// Create a new PIN
const addPIN = (request, response) => {
    const { pin_a } = request.body
    client.query(
        `INSERT INTO pin_total(pin_a) VALUES ($1)`,
        [pin_a],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User added with PIN ID: ${pin_a}`)
        }
    )
}

// Delete PIN
const deletePIN = (request, response) => {
    const pin_a = parseInt(request.params.pin_a)
    client.query("DELETE FROM pin_total WHERE pin_a = $1", [pin_a], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with PIN ID: ${pin_a}`)
    })
}

const getQueue = (requst, response) => {
    client.query("SELECT * FROM song_queue ORDER BY pin_a ASC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const getCommand = (request, response) => {
    client.query("SELECT * FROM command", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const addSongQueue = (request, response) => {
    const { pin_a, pin_q } = request.body
    client.query(
        "INSERT INTO song_queue(pin_a, pin_q) VALUES($1, $2)",
        [pin_a, pin_q],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User added song ${pin_q} to room ${pin_a}`)
        }
    )
}

// const getFirstRowPinQ = (request, response) => {
//     client.query("SELECT pin_q FROM pin_total LIMIT 1", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(results.rows)
//     })
// }

// const getFirstRowPinC = (request, response) => {
//     client.query("SELECT pin_c FROM pin_total LIMIT 1", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(results.rows)
//     })
// }

// const deleteColumnPinQ = (request, response) => {
//     client.query("ALTER TABLE pin_total DROP COLUMN pin_q", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send("User deleted column pin_q")
//     })
// }

// const deleteColumnPinC = (request, response) => {
//     client.query("ALTER TABLE pin_total DROP COLUMN pin_c", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send("User deleted column pin_c")
//     })
// }

// const showPinQ = (request, response) => {
//     client.query("SELECT pin_q FROM pin_total", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(results.rows)
//     })
// }

// const showPinC = (request, response) => {
//     client.query("SELECT pin_c FROM pin_total", (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(results.rows)
//     })
// }

// const deletePinQ = (request, response) => {
//     const id = parseInt(request.params.id)
//     client.query("DELETE FROM pin_total WHERE pin_q = $1", [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send("User deleted column pin_q")
//     })
// }

// const createNewColQ = (request, response) => {
//     client.query(`ALTER pin_total ADD ${'ดัมมี้'}_q varchar(255)`, (error, result) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send("User deleted column pin_q")
//     })
// }

// const createNewColC = (request, response) => {
//     client.query(`ALTER pin_total ADD ${'ดัมมี้'}_c varchar(255)`, (error, result) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send("User deleted column pin_q")
//     })
// }

module.exports = { showPIN, showParticularPin, addPIN, deletePIN, getQueue, getCommand, addSongQueue }
