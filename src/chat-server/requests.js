const axios = require('axios')

async function findConversationsOfUser(username) {
  const res = await axios.get(`http://localhost:3005/conversation/${username}`)

  const result = res.data
  return result
}

module.exports = { findConversationsOfUser }
