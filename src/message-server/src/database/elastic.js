const { Client } = require("@elastic/elasticsearch")
const { match } = require("assert")
const fs = require("fs")

const client = new Client({
	node: "https://localhost:9200",
	auth: {
		username: "elastic",
		password: "ICV+cS96*4pXsk3wb-JD",
	},
	tls: {
		ca: fs.readFileSync("./http_ca.crt"),
		rejectUnauthorized: false,
	},
})
initializeIndices()

async function initializeIndices() {
  client.index({
    index: "conversation",
    document: {
      id: '',
    }
  })

  client.index({
    index: "message",
    document: {
      id: ''
    }
  })
}

async function findConversationsOfUser(username) {
	const result = await client.search({
		index: "conversation",
		query: {
			terms: {
				users: [username],
			},
		},
	})

	return result.hits.hits.map((hit) => hit._source).sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp)
}

async function findMessagesOfConversation(conversationId) {
  const result = await client.search({
    index: "message",
    query: {
      match: {
        conversation_id: conversationId
      }
    }
  })

  return result.hits.hits.map((hit) => hit._source).sort((a, b) => b.timestamp - a.timestamp)
}

async function createConversation(conversation) {
	// assume request body returns correct user names
	const userCount = conversation.users.length
	if (userCount == 2) {
		// check and fail duplicates
		// only check for two people chats
		const result = await client.search({
			index: "conversation",
			query: {
				bool: {
					should: conversation.users.map((user) => ({ match: { users: `${user}` } })),
					minimum_should_match: userCount,
				},
			},
		})
		const hits = result.hits.hits
		if (hits.length > 0 && hits[0]._source.users.length == 2) {
			throw new Error("Duplicate")
		}
	}

	await client.index({
		index: "conversation",
		document: { ...conversation },
	})
	await client.indices.refresh({ index: "conversation" })
}

async function createMessage(message) {
	await client.index({
		index: "message",
		document: { ...message },
	})
  const result = await client.search({
    index: "conversation",
    query: {
      match: {
        id: message.conversation_id
      }
    }
  })
  const conversationId = result.hits.hits[0]._id
  await client.update({
    index: "conversation",
    id: conversationId,
    doc: {
      lastMessage: message.content,
      lastMessageTimestamp: message.timestamp
    }
  })
	await client.indices.refresh({ index: "message" })
}

async function deleteConversations() {
  await client.indices.delete({
    index: "conversation"
  })
  await client.indices.delete({
    index: "message"
  })
  await initializeIndices()
}

module.exports = { createConversation, createMessage, deleteConversations, findConversationsOfUser, findMessagesOfConversation }
