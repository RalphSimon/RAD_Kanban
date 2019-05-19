/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/project/:slug/:id', (req, res) => {
      app.render(req, res, '/project', {
        id: req.params.id,
        slug: req.params.slug
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen('4000', err => {
      if (err) throw err
      console.log('> Ready on http://localhost:4000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
