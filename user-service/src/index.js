const express = require('express')
const app = express()
const pkgJson = require('../package.json')

require('dotenv').config()
const port = process.env.PORT

const userRouter = require('./routers/userRouter')

app.use(express.json())

app.use(userRouter)
app.listen(port, () => {
  console.log(`${pkgJson.name} is running on port ${port}`)
})
