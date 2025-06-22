const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("chat-message", data => {
    io.emit("chat-message", data); // Send to all users including sender
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
