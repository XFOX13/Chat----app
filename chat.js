const socket = io();
const chatBox = document.getElementById("chat-box");
const username = prompt("Enter your username");

document.getElementById("send-btn").addEventListener("click", () => {
  const msg = document.getElementById("msg-input").value;
  if (msg.trim()) {
    socket.emit("chat-message", { username, msg });
    document.getElementById("msg-input").value = "";
  }
});

socket.on("chat-message", (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;
  p.classList.add(data.username === username ? "my-message" : "other-message");
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on("chat-history", (messages) => {
  messages.forEach(data => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`;
    p.classList.add(data.username === username ? "my-message" : "other-message");
    chatBox.appendChild(p);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});
