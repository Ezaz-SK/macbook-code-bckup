// static/script.js
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");

    // This array will store the chat history for the current session
    let conversationHistory = [];

    // Function to add a message to the UI
    const addMessage = (sender, text) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Handle form submission
    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userMessage = messageInput.value.trim();
        if (!userMessage) return;

        // Add user message to UI and history
        addMessage("user", userMessage);
        conversationHistory.push({ role: "user", text: userMessage });

        // Clear input and show typing indicator
        messageInput.value = "";
        addMessage("bot", "Thinking...");

        try {
            // Send message to backend
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const data = await response.json();
            const botMessage = data.answer || "Sorry, I couldn't get a response.";

            // Remove "Thinking..." message
            chatMessages.removeChild(chatMessages.lastChild);

            // Add bot message to UI and history
            addMessage("bot", botMessage);
            conversationHistory.push({ role: "bot", text: botMessage });

        } catch (error) {
            console.error("Error:", error);
            // Remove "Thinking..." message
            chatMessages.removeChild(chatMessages.lastChild);
            addMessage("bot", "Sorry, something went wrong. Please try again.");
        }
    });

    // Add an initial greeting from the bot
    addMessage("bot", "Hello! How can I help you with your documents today?");
});