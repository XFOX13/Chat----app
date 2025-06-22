// Store or ask for username
let username = localStorage.getItem("chat-username");
if (!username) {
  username = prompt("Enter your username:");
  localStorage.setItem("chat-username", username);
}

// Connect to backend server
const socket = io("https://your-backend-url.repl.co"); // 👈 Replace this with your actual backend URL

const input = document.getElementById("msgInput");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const msg = input.value;
  if (!msg.trim()) return;

  const data = { username, msg };
  socket.emit("chat-message", data);

  // Display your own message
  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;
  p.classList.add("my-message");
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = "";
}

socket.on("chat-message", (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;

  if (data.username === username) {
    p.classList.add("my-message");
  } else {
    p.classList.add("other-message");
  }

  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
});
