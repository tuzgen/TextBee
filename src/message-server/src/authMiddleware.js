const axios = require('axios')

const api_key = '14a79766-1e2e-473b-8544-b36a8edcb8df'

// todo include api-key security in this service as well
async function auth(req, res) {
  try {
    const response = await axios.post('http://localhost:3004/login', {
      "username": "admin",
      "password": "admin"
    }, {
      headers: {
        "x-api-key": '14a79766-1e2e-473b-8544-b36a8edcb8df'
      }
    })
    console.log(response.status)
    
  } catch (err) {
    console.log(err.message)
    res.sendStatus(500)
    
  }
}

module.exports = auth
