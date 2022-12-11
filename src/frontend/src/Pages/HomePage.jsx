import React from "react"
import { useState } from "react"
import { OffcanvasBody } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Badge from "react-bootstrap/Badge"
import "./HomePage.css"
import io from "socket.io-client"
import ChatPreviews from "./ChatPreviews"
import SpeechBubble from "../Components/SpeechBubbleOther"
import Cookies from "universal-cookie"

import ChatBarPrivate from "../Components/ChatBarPrivate"
import ChatBarGroup from "../Components/ChatBarGroup"

const connection = io("http://localhost:3001")
const { username, token } = new Cookies().getAll()

connection.on("connect", (socket) => {
	console.log("Connected!")
})

function HomePage() {
	const [offcanvasVisible, setOffcanvasVisible] = useState(false)
	const [messages, setMessages] = useState([])
	const [typingMessage, setTypingMessage] = useState("")

	function onMessageSend(e) {
		e.preventDefault()
		// send message
		const data = { sender: username, message: typingMessage }
		setMessages([...messages, data])
		connection.emit("messageSent", data)
		setTypingMessage("")
	}

	connection.on("userConnected", (socket) => {
		setMessages([...messages, { sender: "server", message: "new connection" }])
	})

	// receive message
	connection.on("messageSent", (data) => {
		setMessages([...messages, data])
	})

	return (
		<div>
			<Button className="btn-show-chats" variant="outline-primary" onClick={() => setOffcanvasVisible(true)}>
				Show Chats {""} <Badge bg="success">1</Badge>
			</Button>
			<hr />

			<SpeechBubble></SpeechBubble>

			<Offcanvas show={offcanvasVisible} backdrop="false" onHide={() => setOffcanvasVisible(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Disturd 💩</Offcanvas.Title>
				</Offcanvas.Header>
				<OffcanvasBody>
					<div style={{ display: "flex", gap: "10px" }}>
						<ChatBarPrivate /> <ChatBarGroup />
					</div>
					<hr />

					<div style={{ display: "flex" }}>
						<ChatPreviews></ChatPreviews>
					</div>
				</OffcanvasBody>
			</Offcanvas>
			<ul id="messages">
				{messages.map((message) => (
					<li>{`${message.sender}: ${message.message}`}</li>
				))}
			</ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" value={typingMessage} onChange={(e) => setTypingMessage(e.target.value)} autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
