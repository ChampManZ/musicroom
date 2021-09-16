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

// อันนี้ dummy นะ
fastify.get('/film', db.getFilm)

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
