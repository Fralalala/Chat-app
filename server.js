const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const connectDB = require('./config/db')

//Connect Database
connectDB()

//This would Enable the req.body to be usable. ??
//Init MiddleWare
app.use(express.json({extended: false}))

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
    myPath = roomName;
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

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 8000;
server.listen(port);
