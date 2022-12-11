const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../database/connection")
const auth = require("../middleware/auth")

const router = new express.Router()

router.post("/login", auth, async (req, res) => {
	const { username, password } = req.body
	res.status(200).send({ token: jwt.sign(username, process.env.JWT_SECRET) })
})

router.post("/user", async (req, res) => {
	const { username, password } = req.body
	const hashedPassword = bcrypt.hashSync(String(password), 10)

	await db.query("INSERT INTO users (username, password) VALUES ($1, $2);", [username, hashedPassword])

	res.status(201).send({ token: jwt.sign(username, process.env.JWT_SECRET) })
})

module.exports = router
