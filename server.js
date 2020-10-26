const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  let myPath = "";

  //for some reason window.location.pathname doesnt work in the server.js, so I had to get the variable in another jsx, in this case Messaging.jsx
  socket.emit("join");

  socket.on("set join", (path) => {
    myPath = path;
    socket.join(path);
  });

  socket.on("enter room", (roomName) => {
    
    socket.leaveAll();
    socket.join(roomName);
    myPath = roomName
  });

  socket.emit("alert-message", "You have Joined a room");
  socket.broadcast.emit("alert-message", "A user has joined the chat");

  socket.emit("my id", socket.id);

  socket.to(myPath).on("message sent", (message) => {
    io.to(myPath).emit("add conversation", message);
  });

  socket.on("disconnect", () => {
    io.emit("alert-message", "A user has disconnected");
  });
});

server.listen(8000, () => console.log(`server listening on port 8k and `));
