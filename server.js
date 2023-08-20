const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Initialize a list to store connected users
const connectedUsers = {};

io.on("connection", (socket) => {
  // Listen for new connections

  socket.on("join", (username) => {
    // When a new user joins, store their socket ID and username
    connectedUsers[socket.id] = username;

    // Broadcast to all clients that a new user has joined
    io.emit("userJoined", username);

    // Send a list of all connected users to the client
    io.emit("updateUsers", Object.values(connectedUsers));
  });

  socket.on("message", (message) => {
    // Listen for incoming messages and broadcast them to all clients
    io.emit("message", { username: connectedUsers[socket.id], message });
  });

  socket.on("disconnect", () => {
    // When a user disconnects, remove them from the list of connected users
    const username = connectedUsers[socket.id];
    delete connectedUsers[socket.id];

    // Broadcast to all clients that a user has left
    io.emit("userLeft", username);

    // Send an updated list of connected users to the clients
    io.emit("updateUsers", Object.values(connectedUsers));
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
