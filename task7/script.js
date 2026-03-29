
const chats =  JSON.parse(localStorage.getItem("chats")) || [];


const botChat = [
    { message: "Hey Arvind 👋", from: "bot" },
    { message: "What’s up?", from: "bot" },
    { message: "Working on something cool?", from: "bot" },
    { message: "Did you finish your project?", from: "bot" },
    { message: "Let’s catch up sometime!", from: "bot" }
];

const replyChat = [
    { message: "Nice!", from: "bot" },
    { message: "Sounds good 👍", from: "bot" },
    { message: "That’s interesting 🤔", from: "bot" },
    { message: "Haha okay 😂", from: "bot" },
    { message: "Cool, tell me more!", from: "bot" }
];

const user_input = document.getElementById("user_input");

const send_btn = document.getElementById("send_btn");


const chatSection = document.getElementById("chat_section")

renderChat();


send_btn.addEventListener("click", () => {
    const message = user_input.value.trim();
    if (!message) return;

    chats.push({
        message,
        from: "user",
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    });

    user_input.value = "";
    updateStorage();
    renderChat();
    reply();
});



setInterval(() => {
    const message = botChat[Math.floor(Math.random() * botChat.length)];

    chats.push({
        ...message,
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    });

    updateStorage();
    renderChat();
}, 10000);


function updateStorage(){
    localStorage.setItem("chats",JSON.stringify(chats));
}   

function renderChat() {
    chatSection.innerHTML = "";

    chats.forEach(chatItem => {
        const chatDiv = document.createElement("div");

        chatDiv.classList.add(chatItem.from === "user" ? "user" : "bot");

        const chatmsg = document.createElement("p");
        chatmsg.innerText = chatItem.message;

        const time = document.createElement("span");
        time.classList.add("time");
        time.innerText = chatItem.time || "";

        chatDiv.appendChild(chatmsg);
        chatDiv.appendChild(time);

        chatSection.appendChild(chatDiv);
    });

    chatSection.scrollTop = chatSection.scrollHeight;
}


function reply() {
   
    const waitDiv = document.createElement("div");
    waitDiv.classList.add("bot");

    const text = document.createElement("p");
    text.innerText = "typing...";
    waitDiv.appendChild(text);

    chatSection.appendChild(waitDiv);
    chatSection.scrollTop = chatSection.scrollHeight;

    setTimeout(() => {
        waitDiv.remove();

        chats.push({
            ...replyChat[Math.floor(Math.random() * replyChat.length)],
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        });

        updateStorage();
        renderChat();
    }, (Math.floor(Math.random() * 5) + 3) * 1000);
}