const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: { origin: "*" } // Allow all origins (for testing)
});

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("chat-message", data => {
    // Broadcast message to everyone except sender
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
