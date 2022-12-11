const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const db = require("../database/connection")
const auth = require("../middleware/auth")
const { createUser } = require('../database/queries')

const router = new express.Router()

router.post("/login", auth, async (req, res) => {
	const { username, password } = req.body
	res.status(200).send({ token: jwt.sign(username, process.env.JWT_SECRET) })
})

router.post("/register", async (req, res) => {
	const { username, password } = req.body
	const hashedPassword = bcrypt.hashSync(String(password), 10)

	await createUser(username, hashedPassword)

	res.status(201).send({ token: jwt.sign(username, process.env.JWT_SECRET) })
})

module.exports = router
