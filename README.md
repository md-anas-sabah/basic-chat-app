# basic-chat-app

A chat app built using ChatGPT

if (`${data.message}` === "react") {
console.log("react is cool");
/_ listItem.textContent = `${"👀" + data.message}`; _/
listItem.textContent = `${data.message}.replace("react", "lodu")`;
messageList.appendChild(listItem);
}


//working

if (`${data.message}`.includes("/help")) {
console.log("react");
listItem.textContent = `${data.message}`.replace("react", "⚛️");
messageList.appendChild(listItem);
} else if (`${data.message}`.includes("woah")) {
console.log("Woah");
listItem.textContent = `${data.message}`.replace("woah", "😲");
messageList.appendChild(listItem);
} else if (`${data.message}`.includes("hey")) {
console.log("hey");
listItem.textContent = `${data.message}`.replace("hey", "👋");
messageList.appendChild(listItem);
}
