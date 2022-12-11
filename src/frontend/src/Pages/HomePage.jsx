import React from "react"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"

import io from "socket.io-client"

const connection = io("http://localhost:3001")
var id = -1

connection.on("connect", (socket) => {
	console.log("Connected!")
})

function HomePage() {
	const [offcanvasVisible, setOffcanvasVisible] = useState(false)
	const [messages, setMessages] = useState([])

	const [typingMessage, setTypingMessage] = useState("")

	function onMessageSend(e) {
		e.preventDefault()
		console.log("gonderiyo")
		connection.emit("messageSent", { sender: id, message: typingMessage })
	}

	connection.on("assignId", (_id) => {
		id = _id
	})

	connection.on("userConnected", (socket) => {
		setMessages([...messages, { sender: -1, message: "new connection" }])
	})

	connection.on("messageSent", (data) => {
		console.log("hoop")
		setMessages([...messages, data])
	})

	return (
		<div>
			<Button variant="primary" onClick={() => setOffcanvasVisible(true)}>
				Open
			</Button>
			<Offcanvas show={offcanvasVisible} backdrop="false" onHide={() => setOffcanvasVisible(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Disturd 💩</Offcanvas.Title>
				</Offcanvas.Header>
			</Offcanvas>
			<ul id="messages">
				{messages.map((message) => (
					<li>{`${message.sender}: ${message.message}`}</li>
				))}
			</ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" onChange={(e) => setTypingMessage(e.target.value)} autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
