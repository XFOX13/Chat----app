let username = localStorage.getItem("chat-username");
if (!username) {
  username = prompt("Enter your username:");
  localStorage.setItem("chat-username", username);
}

const socket = io("https://chat----app.glitch.me"); // Replace with your actual Glitch URL

const input = document.getElementById("msgInput");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const msg = input.value;
  if (!msg.trim()) return;

  const data = { username, msg };
  socket.emit("chat-message", data);
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

function changeUsername() {
  localStorage.removeItem("chat-username");
  location.reload();
}
