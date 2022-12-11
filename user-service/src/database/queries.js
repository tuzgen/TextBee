const { Connection } = require("pg")
const db = require("./connection")

module.exports = {
	findAllUsers: (username) => db.query("SELECT id, username, password FROM users WHERE username = $1", [username]),
	createUser: (username, password) => db.query("INSERT INTO users (username, password) VALUES ($1, $2);", [username, password]),
}
