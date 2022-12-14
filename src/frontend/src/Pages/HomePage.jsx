import React from "react"
import { useState } from "react"
import { OffcanvasBody } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Badge from "react-bootstrap/Badge"
import "./HomePage.css"
import io from "socket.io-client"
import ChatPreviews from "./ChatPreviews"
import SpeechBubbleReceived from "../Components/SpeechBubbleOther"
import Cookies from "universal-cookie"

import ChatBarPrivate from "../Components/ChatBarPrivate"
import ChatBarGroup from "../Components/ChatBarGroup"
import ChatCardHeader from "../Components/ChatCardHeader"
import SpeechBubbleSent from "../Components/SpeechBubbleSent"
import { useEffect } from "react"
import { useRef } from "react"

const connection = io("http://localhost:3001")
const { username, token } = new Cookies().getAll()

connection.on("connect", (socket) => {
	console.log("Connected!")
	connection.emit("username", username)
})

function HomePage() {
	const messagesEndRef = useRef(null)
	const [conversations, setConversations] = useState([])
	const [currentChat, setCurrentChat] = useState("")
	const [offcanvasVisible, setOffcanvasVisible] = useState(false)
	const [messages, setMessages] = useState([])
	const [typingMessage, setTypingMessage] = useState("")

	useEffect(() => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	useEffect(() => {
		// send to socket server
		connection.emit("message", currentChat)

		// call set messages
	}, [currentChat])

	// receive from socket server
	connection.on("message", (messages) => {
		setMessages(
			messages.map((message) => {
				return {
					sentAt: message.timestamp,
					sender: message.sender,
					message: message.content,
				}
			})
		)
	})

	function onMessageSend(e) {
		e.preventDefault()
		// send message
		if (!typingMessage.trim()) return
		const message = { sentAt: Date.now(), sender: username, message: typingMessage }
		setMessages([...messages, message])
		connection.emit("messageSent", { conversationId: currentChat, message })
		setTypingMessage("")
	}

	connection.on("conversation", (conversations) => {
		conversations.forEach((conversation) => {
			conversation.users = conversation.users.filter((u) => u !== username)
		})
		setConversations([...conversations])
		setCurrentChat(conversations[0].id)
	})

	connection.on("userConnected", (socket) => {
		setMessages([...messages, { sentAt: Date.now(), sender: "server", message: "new connection" }])
	})

	// receive message
	connection.on("messageSent", ({ conversationId, message }) => {
		if (currentChat === conversationId) setMessages([...messages, message])
	})

	return (
		<div>
			<Button className="btn-show-chats" variant="primary" onClick={() => setOffcanvasVisible(true)}>
				Show Chats {""} <Badge bg="success">1</Badge>
			</Button>
			<hr />

			<ChatCardHeader></ChatCardHeader>

			<Offcanvas show={offcanvasVisible} backdrop="false" onHide={() => setOffcanvasVisible(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>TextBee 🐝</Offcanvas.Title>
				</Offcanvas.Header>
				<OffcanvasBody>
					<div style={{ display: "flex", gap: "10px" }}>
						<ChatBarPrivate /> <ChatBarGroup />
					</div>
					<hr />

					<div style={{ display: "flex" }}>
						<ChatPreviews conversations={conversations} onClick={setCurrentChat}></ChatPreviews>
					</div>
				</OffcanvasBody>
			</Offcanvas>
			<ul id="messages">
				{messages.map((message) => {
					if (message.sender === username) {
						return <SpeechBubbleSent sentAt={message.sentAt} sender={message.sender} message={message.message} />
					} else {
						return <SpeechBubbleReceived sentAt={message.sentAt} sender={message.sender} message={message.message} />
					}
				})}
				<div ref={messagesEndRef}></div>
			</ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" value={typingMessage} onChange={(e) => setTypingMessage(e.target.value)} autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
