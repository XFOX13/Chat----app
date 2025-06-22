const socket = io("https://your-server-url.glitch.me"); // Replace with your backend server URL

const input = document.getElementById("msgInput");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const msg = input.value;
  socket.emit("chat-message", msg);
  input.value = "";
}

socket.on("chat-message", (msg) => {
  const p = document.createElement("p");
  p.textContent = msg;
  chatBox.appendChild(p);
});
