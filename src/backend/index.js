
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io')
const cors = require("cors");
const { log } = require('console');

app.use(cors())

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

const server = http.createServer(app);


//Frontend on origin: "http://localhost:3000"
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

})

server.listen(3001, () => {
  console.log('listening on *:3001');
});
