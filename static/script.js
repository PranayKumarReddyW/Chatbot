// script.js

document.getElementById("send-button").addEventListener("click", function () {
  const userMessage = document.getElementById("message-input").value;

  // Display the user's message in the chat
  const messageContainer = document.querySelector(".chat-messages");
  const userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add("chat-message", "user");
  userMessageDiv.innerHTML = `<div class="message-content">${userMessage}</div>`;
  messageContainer.appendChild(userMessageDiv);

  // Clear input
  document.getElementById("message-input").value = "";

  // Send the message to the Flask server
  fetch("http://127.0.0.1:5000/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the chatbot's response in the chat
      const botMessageDiv = document.createElement("div");
      botMessageDiv.classList.add("chat-message", "bot");
      botMessageDiv.innerHTML = `<img src="./static/robot_PNG7.png" alt="Robot" style="width: 50px; height: auto; margin-right: 10px;">
                                   <div class="message-content">${data.response}</div>`;
      messageContainer.appendChild(botMessageDiv);

      // Scroll to the bottom of the chat
      messageContainer.scrollTop = messageContainer.scrollHeight;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
