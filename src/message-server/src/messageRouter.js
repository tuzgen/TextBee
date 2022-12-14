const express = require("express")
const { v4 } = require("uuid")

const auth = require("./authMiddleware")

const { createConversation, createMessage, deleteConversations, findConversationsOfUser } = require('./database/elastic')

const router = new express.Router()

router.get('/conversation/:username', async (req, res) => {
  const { username } = req.params

  const conversations = await findConversationsOfUser(username)

  res.status(200).send(conversations)
})

/**
 * body: {
 * users: [string]
 * }
 */
// assume users are valid (deleting users is not supported)
router.post("/conversation", async (req, res) => {
	const conversation = {
		id: v4(),
		lastMessage: "",
		lastMessageTimestamp: Date.now(),
		...req.body,
	}

  try {
    await createConversation(conversation)
  } catch (err) {
    console.log(err)
    return res.sendStatus(409)
  }

  res.status(201).send({ id: conversation.id, users: req.body.users })
})

/**
 * body: {
 * conversation_id,
 * conversation_participants,
 * sender,
 * content,
 * timestamp
 * }
 */
router.post("/message", async (req, res) => {
	const message = {
		id: v4(),
		...req.body,
	}
})

router.delete("/conversation", async (req, res) => {
  await deleteConversations()
  res.sendStatus(200)
})

module.exports = router
