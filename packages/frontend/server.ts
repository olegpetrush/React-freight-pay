import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const NODE_PORT = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.post('/api/graphql', (req, res) => {
      return handle(req, res)
    })

    server.listen(NODE_PORT, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${NODE_PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
