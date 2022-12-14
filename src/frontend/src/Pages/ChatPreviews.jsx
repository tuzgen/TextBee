import ChatCard from "../Components/ChatCard"
import React from "react"

function ChatPreviews({ conversations, onClick }) {
	return (
		<div style={{ width: "100rem" }}>
			<div style={{ marginTop: "10px", gap: "5px", listStyle: "none", display: "flex", flexDirection: "column" }}>
				{conversations.map((conversation) => (
					<ChatCard name={conversation.users.join(", ")} message={conversation.lastMessage} onClick={() => onClick(conversation.id)} />
				))}
			</div>
		</div>
	)
}

export default ChatPreviews
