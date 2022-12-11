const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { findAllUsers } = require("../database/queries")

async function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"]
	// bearer token
	const token = authHeader && authHeader.split(" ")[1]
	const { username, password } = req.body
  findAllUsers(username).then((error, result) => {
    console.log("error", error)
    if (error)
      return res.sendStatus(400)
    console.log(!result)
    if (!result)
      return res.sendStatus(404)

    const user = result.rows[0]
    console.log(user)

    if (token == null) {
      if (!(bcrypt.compareSync(password, user.password)))
        return res.sendStatus(403)

      req.user = user
      next()
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        if (user.username) {
          return res.sendStatus(400)
        }
        req.user = user
        next()
      })
    }
  })
}

module.exports = authenticateToken
