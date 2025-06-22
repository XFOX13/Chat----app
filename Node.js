const io = require("socket.io")(3000, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("User connected");

  socket.on("chat-message", msg => {
    socket.broadcast.emit("chat-message", msg);
  });
});
