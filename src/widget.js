
// /root/.openclaw/workspace/citizensnonrenewal-landing/src/widget.js

(function() {
    const WIDGET_ID = 'ai-quote-chat-widget';
    const API_ENDPOINT = '/api/chat'; // Our new Flask proxy endpoint

    function initWidget() {
        let chatContainer = document.getElementById(WIDGET_ID);
        if (!chatContainer) {
            chatContainer = document.createElement('div');
            chatContainer.id = WIDGET_ID;
            document.body.appendChild(chatContainer);
        }

        chatContainer.innerHTML = `
            <style>
                #${WIDGET_ID} {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 300px;
                    height: 400px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    font-family: sans-serif;
                    z-index: 1000;
                }
                #${WIDGET_ID} .chat-header {
                    background-color: #0056b3;
                    color: white;
                    padding: 10px;
                    border-top-left-radius: 9px;
                    border-top-right-radius: 9px;
                    font-weight: bold;
                }
                #${WIDGET_ID} .chat-messages {
                    flex-grow: 1;
                    padding: 10px;
                    overflow-y: auto;
                    border-bottom: 1px solid #eee;
                }
                #${WIDGET_ID} .chat-input-form {
                    display: flex;
                    padding: 10px;
                }
                #${WIDGET_ID} .chat-input-form input {
                    flex-grow: 1;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    padding: 8px;
                    margin-right: 5px;
                }
                #${WIDGET_ID} .chat-input-form button {
                    background-color: #0056b3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 8px 12px;
                    cursor: pointer;
                }
            </style>
            <div class="chat-header">AI Quote Assistant</div>
            <div class="chat-messages" id="ai-chat-messages"></div>
            <form class="chat-input-form" id="ai-chat-form">
                <input type="text" placeholder="Ask about your coverage..." id="ai-chat-input" />
                <button type="submit">Send</button>
            </form>
        `;

        const messagesContainer = document.getElementById('ai-chat-messages');
        const chatForm = document.getElementById('ai-chat-form');
        const chatInput = document.getElementById('ai-chat-input');
        let conversationHistory = [];

        function appendMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            appendMessage('You', userMessage);
            conversationHistory.push({ role: 'user', content: userMessage });
            chatInput.value = '';
            appendMessage('AI', 'Typing...');

            try {
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages: conversationHistory }),
                });

                const data = await response.json();

                messagesContainer.lastChild.remove(); // Remove "Typing..."

                if (response.ok) {
                    const aiReply = data.reply;
                    appendMessage('AI', aiReply);
                    conversationHistory.push({ role: 'assistant', content: aiReply });
                } else {
                    appendMessage('AI', `Error: ${data.message || data.error || 'Unknown error'}`);
                }
            } catch (error) {
                messagesContainer.lastChild.remove(); // Remove "Typing..."
                appendMessage('AI', `Network Error: ${error.message}`);
                console.error('Chat widget error:', error);
            }
        });

        // Initial welcome message
        appendMessage('AI', 'Hi! I am your AI insurance assistant. How can I help you today?');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
