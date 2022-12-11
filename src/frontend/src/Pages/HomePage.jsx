import React from "react"
import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

import io from "socket.io-client"

const connection = io("http://localhost:3001")

connection.on("connect", () => {
  console.log("Connected!")
})

function HomePage() {
  const [offcanvasVisible, setOffcanvasVisible] = useState(true)
  const [messages, setMessages] = useState(["message", "sadsa"])
	function onMessageSend(e) {
		e.preventDefault()
	}

  connection.on("userConnected", (socket) => {
    setMessages([...messages, "new connection"])
  })

	return (
		<div>
      <Button variant="primary" onClick={() => setOffcanvasVisible(true)}>Open</Button>
      <Offcanvas show={offcanvasVisible} backdrop="false" onHide={() => setOffcanvasVisible(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Disturd 💩</Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>
			<ul id="messages">
        {
          messages.map((message) => <li>{message}</li>)
        }
      </ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
