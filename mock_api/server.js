/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '/public/db.json'))

const PORT = 5000
const ROOT = '/api'

/* eslint-disable no-console */
const middlewares = jsonServer.defaults({
  // Display custom index html, with links to endpoint roots.
  // static: 'node_modules/json-server/dist'
  static: 'mock_api/public/'
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

/*
	Any custom routing would go here, before injecting your router, e.g.:
	https://github.com/typicode/json-server#module
*/

server.use((req, res, next) => {
  setTimeout(next, 0)
})

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use(ROOT, router)
server.listen(PORT, () => {
  console.log(`JSON server is running on: http://localhost:${PORT}`)
})
