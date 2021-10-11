// Import Fastify to our environment. Also, we add logger to provide us more information for debugging.
const fastify = require('fastify')({logger: true})
const db = require('./src/config')

// localhost PORT 5000
const PORT = 5000

// Register Postgres to Fastify
fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres@localhost/postgres'
})

// Create a route for homepage which is parameter '/'.
fastify.get('/', (req, reply) => {
    reply.send({test: 'Hello'})
})

// Show all pin and add pin room
fastify.get('/pintotal', db.showPIN)
fastify.post('/pintotal', db.addPIN)
fastify.delete('/pintotal/:pin_a', db.deletePIN)

// Show pinq and pinc of firstrow
fastify.get('/firstrowpinq', db.getFirstRowPinQ)
fastify.get('/firstrowpinc', db.getFirstRowPinC)

// Show pin q and pinc
fastify.get('/pinq', db.showPinQ)
fastify.get('/pinc', db.showPinC)

// Delete specific pin of q
fastify.delete('/pinq/:pin_q', db.deletePinQ)

// Delete column of pin c
fastify.delete('/pinc/:pin_c', db.deleteColumnPinC)

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
