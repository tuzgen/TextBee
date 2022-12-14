const client = require('./database/elastic')
const express = require('express')
const app = express()
const cors = require('cors')

const router = require('./messageRouter')

require('dotenv').config()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(router)

app.listen(port, () => {
  console.log(`message server running on port ${port}`)
})
