import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import editicon from "../assets/chat-edit.svg"
import Form from "react-bootstrap/Form"

function ChatBarPrivate({ createConversation, loggedInUser }) {
	const [username, setUsername] = useState("")
	const [show, setShow] = useState(false)

	const handleClose = () => {
		setShow(false)
	}
	const handleShow = () => setShow(true)

	return (
		<>
			<div className="chat-bar" style={{ display: "flex", gap: "10px" }}>
				<Button onClick={handleShow}>
					{" "}
					<img className="icon" src={editicon}></img>
					{"  "} New Chat
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Chat</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Label>Search</Form.Label>
						<Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username or comma separated list" />
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							if (username.includes(",")) {
								createConversation([...(username.split(",")), loggedInUser])
							} else {
								createConversation([username, loggedInUser])
							}
						}}
					>
						Create Chat
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ChatBarPrivate
