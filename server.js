const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("chat-message", data => {
    io.emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
