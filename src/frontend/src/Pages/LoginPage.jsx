import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Cookies from "universal-cookie"
import "./LoginPage.css"
import PropTypes from "prop-types"
import { useEffect } from "react"
import LoginError from "../Components/LoginError"

const cookies = new Cookies()

function LoginPage({ setToken }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		const token = cookies.get("token")
		if (token) {
			setToken(token)
		}
	}, [setToken])

	const handleSubmit = (e) => {
		e.preventDefault()

		fetch("http://localhost:3004/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((res) => {
				try {
					if (res.status >= 400) throw new Error("error returned")
					return res.json()
				} catch (error) {
					console.log(error)
          return(<div><LoginError></LoginError></div>);
				}
			})
			.then((token) => {
				cookies.set("token", token.token)
				cookies.set("username", username)
				setToken(token.token)
			})
	}

	return (
		<div>
			<Form onSubmit={handleSubmit} className="login-form">
				<h1 className="login-header"> Login to TextBee 🐝</h1>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}

LoginPage.propTypes = {
	setToken: PropTypes.func.isRequired,
}

export default LoginPage
