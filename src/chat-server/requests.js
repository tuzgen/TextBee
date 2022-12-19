const axios = require("axios")

async function findConversationsOfUser(username) {
	const res = await axios.get(`http://localhost:3005/conversation/${username}`)

	const result = res.data
	return result
}

async function createConversation(users) {
	try {
		const res = await axios.post(`http://localhost:3005/conversation`, {
			users: users
		})

		const result = res.data
		console.log(result)
		return result
	} catch(e) {
		return null
		console.log(e)
	}
}

async function retrieveChatMessages(conversation_id) {
	try {
		const res = await axios.get(`http://localhost:3005/message/${conversation_id}`)
		return res.data
	} catch (err) {
		return null
		// console.log(err)
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

module.exports = { findConversationsOfUser, createConversation, retrieveChatMessages, createChatMessage }
