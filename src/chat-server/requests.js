const axios = require("axios")

async function findConversationsOfUser(username) {
	const res = await axios.get(`http://localhost:3005/conversation/${username}`)

	const result = res.data
	return result
}

async function retrieveChatMessages(conversation_id) {
	try {
		const res = await axios.get(`http://localhost:3005/message/${conversation_id}`)
		return res.data
	} catch (err) {
		console.log(err)
	}
}

async function createChatMessage(message) {
	const { conversation_id, conversation_participants, sender, content, timestamp } = message

	const res = await axios.post(`http://localhost:3005/message`, {
		conversation_id,
		conversation_participants,
		sender,
		content,
		timestamp,
	})
}

module.exports = { findConversationsOfUser, retrieveChatMessages, createChatMessage }
