// Import Fastify to our environment. Also, we add logger to provide us more information for debugging.
const fastify = require('fastify')({logger: true})
const db = require('./src/config')

// localhost PORT 5000
const PORT = 5000

// Register Postgres to Fastify
fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres@localhost/postgres'
})

fastify.register(require('fastify-cors'), function (instance) {
    return (req, callback) => {
        let corsOptions;
        const origin = req.headers.origin
        if (/localhost/.test(origin)) {
            corsOptions = { origin: true }
        } else {
            corsOptions = { origin: true }
        }
        callback(null, corsOptions)
    }
})

// Create a route for homepage which is parameter '/'.
fastify.get('/', (req, reply) => {
    reply.send({test: 'Hello'})
})

// Show all pin and add pin room
fastify.get('/pintotal', db.showPIN)

// Show queue based on PIN
fastify.get('/songqueue', db.getQueue)

// Get command
fastify.get('/command', db.getCommand)

// Get single pin
fastify.get('/pintotal/:pin_a', db.showParticularPin)

// Add pin
fastify.post('/pintotal', db.addPIN)

// Add song queue
fastify.post('/songqueue', db.addSongQueue)

// Delete pin
fastify.delete('/pintotal/:pin_a', db.deletePIN)

// Delete song
fastify.delete('/songqueue/:pin_a/:pin_q', db.deleteSong)

// Start our server immediately.
const start = async () => {
    // If there is no error, start our server by listen to port 5000
    try {
        await fastify.listen(PORT)
        console.log(`Server listening on ${fastify.server.address().port}`)
    // If there is an error,
    } catch (error) {
        // throw an error then exit.
        fastify.log.error(error)
        process.exit(1)
    }
}

// npm run dev to start our server. (We use dev because we still need it in developing environment)
start()
