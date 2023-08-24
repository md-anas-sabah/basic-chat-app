const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const connectedUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    connectedUsers[socket.id] = username;
    io.emit("userJoined", username);
    io.emit("updateUsers", Object.values(connectedUsers));
  });

  socket.on("message", (message) => {
    io.emit("message", { username: connectedUsers[socket.id], message });
  });

  socket.on("disconnect", () => {
    const username = connectedUsers[socket.id];
    delete connectedUsers[socket.id];
    io.emit("userLeft", username);
    io.emit("updateUsers", Object.values(connectedUsers));
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
