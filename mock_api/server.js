const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const db = require(path.join(__dirname, 'db.json'))

const PORT = 5000
const ROOT = '/api'

/* eslint-disable no-console */
const middlewares = jsonServer.defaults({
	// Display json-server's built in homepage when json-server starts.
	static: 'node_modules/json-server/dist'
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

/*
	Any custom routing would go here, before injecting your router, e.g.:
	https://github.com/typicode/json-server#module
*/

server.use((req, res, next) => {
	next()
})

server.use(ROOT, router)
server.listen(PORT, () => {
	console.log(`
		JSON server is running on: http://localhost:${PORT},
		Starting with these end-points: ${getEndPoints(db)}
	`)
})

function getEndPoints(db) {
	return Object.keys(db).map(point => ` ${ROOT}/${point} `)
}
