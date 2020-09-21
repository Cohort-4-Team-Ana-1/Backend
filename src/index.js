const express = require('express')
const database = require('./database')
const { config } = require('./config')
const usersApi = require('./components/users/routes')
const roomsApi = require('./components/rooms/routes')
const app = express()

// MongoDB Connection
database.connection()

// Body Parser
app.use(express.json({ extended: true }))

// Routes
usersApi(app)
roomsApi(app)

app.get('/', (req, res) => {
  res.send(`
  Server Online
  
  For more information visit: https://github.com/Cohort-4-Team-Ana-1/Backend-Roompali`)
})

// Server
app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`)
})
