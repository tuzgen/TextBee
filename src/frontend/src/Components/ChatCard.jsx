import React from "react"
import Card from "react-bootstrap/Card"
import "./ChatCard.css"
import usericon from "../assets/user-circle.svg"

function ChatCard(props) {
	return (
		<div>
			<Card style={{ width: "inherit" }}>
				<div>
					<Card.Header style={{ display: "flex", alignItems: "center" }}>
						<img style={{ width: "30px", marginRight: "6px", textAlign: "center" }} src={usericon}></img> {props.name}
					</Card.Header>
				</div>
				<Card.Body style={{ cursor: "pointer" }} onClick={props.onClick}>
					<small className="chat-message">{props.message}</small>
				</Card.Body>
			</Card>
		</div>
	)
}

export default ChatCard
