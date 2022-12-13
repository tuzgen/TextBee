const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: "elastic",
    password: "ICV+cS96*4pXsk3wb-JD"
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})

module.exports = client
