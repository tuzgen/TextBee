import React from "react"
import { useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas'

import io from "socket.io-client"

const socket = io("http://localhost:3001")

socket.on("connect", () => {
  console.log("Connected!")
})

function HomePage() {
  const [offcanvasVisible, setOffcanvasVisible] = useState(true)
	function onMessageSend(e) {
		e.preventDefault()
	}

	return (
		<div>
      <Offcanvas show={offcanvasVisible} backdrop="false" >
        
      </Offcanvas>
			<ul id="messages"></ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
