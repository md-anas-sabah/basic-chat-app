let symbols = {
  react: "⚛️",
  woah: "😲",
  hey: "👋",
  lol: "😂",
  love: "❤️",
  congratulations: "🎉",
};

const randomNumber = Math.random() * 10;

const socket = io();
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const userList = document.getElementById("user-list");
const messageList = document.getElementById("message-list");

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message.trim() !== "") {
    socket.emit("message", message);
    messageInput.value = "";
  }
});

socket.on("message", (data) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${data.message}`;
  messageList.appendChild(listItem);

  const regex = /\b(react|woah|hey|lol|love|congratulations)\b/g;
  const replacedMessage = data.message.replace(
    regex,
    (match) => symbols[match]
  );

  if (replacedMessage !== data.message) {
    console.log(replacedMessage);
    listItem.textContent = replacedMessage;
    messageList.appendChild(listItem);
  }

  /* --------------OPTIONAL ASSIGNMENT----------------------- */
  if (`${data.message}`.includes("/help")) {
    alert(
      "Available Commands: \n /help-show me this message \n /random-Print a random number \n /clear- Clear the chat"
    );
    listItem.textContent = "";
    messageList.appendChild(listItem);
  } else if (`${data.message}`.includes("/clear")) {
    messageList.innerHTML = "";
  } else if (`${data.message}`.includes("/random")) {
    listItem.textContent = "Here's your random number: " + randomNumber;
    messageList.appendChild(listItem);
  }
  /* --------------OPTIONAL ASSIGNMENT----------------------- */
});

socket.emit("join", username);

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    io.emit("updateUsers", Object.values(connectedUsers));
  });

  socket.on("message", (message) => {
    io.emit("message", { username: connectedUsers[socket.id], message });
  });

  socket.on("disconnect", () => {
    // ...
  });
});
