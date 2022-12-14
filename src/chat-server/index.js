const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const axios = require('axios')

const { findConversationsOfUser } = require('./requests')

app.use(cors())

const server = http.createServer(app)

//Frontend on origin: "http://localhost:3000"
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
})

app.get("/", (req, res) => {
	res.send("<h1>Hello world</h1>")
})
io.on("connection", async (socket) => {
	console.log(`User connected: ${socket.id}`)

	// here receive message from socket, username or id of the connected user
	socket.on('username', async (username) => {
		// fetch friends or active chatrooms of user
		const conversations = await findConversationsOfUser(username)
		socket.emit("conversation", conversations)
		conversations.forEach((conversation) => {
			// connect user to socket.io rooms
			socket.join(conversation.id)
			socket.to(conversation.id).emit("userConnected", {username})
		})

		socket.on("messageSent", ({conversationId, message}) => {
			socket.to(conversationId).emit("messageSent", { conversationId, message })
			// socket.broadcast.emit("messageSent", args)
		})
	})

})

server.listen(3001, () => {
	console.log("listening on *:3001")
})
