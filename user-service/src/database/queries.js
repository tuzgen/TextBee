const { Connection } = require('pg')
const db = require('./connection')

module.exports = {
  findAllUsers: (username) => db.query("SELECT id, username, password FROM users WHERE username = $1", [username])
}