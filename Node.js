const io = require("socket.io")(3000, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("User connected");

  socket.on("chat-message", data => {
    socket.broadcast.emit("chat-message", data);
  });
});
