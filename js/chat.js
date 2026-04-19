export function initChat() {
    const chatWidget = document.getElementById('chat-widget');
    if (!chatWidget) return;
    
    const chatHeader = document.getElementById('chat-header');
    const chatToggle = document.getElementById('chat-toggle');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function saveMessage(text, type) {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push({ text, type, timestamp: new Date().toISOString() });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    
    function loadChatHistory() {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        chatMessages.innerHTML = '<div class="chat-message system">Welcome! How can we help you today?</div>';
        messages.forEach(msg => addMessage(msg.text, msg.type));
    }
    
    chatToggle.addEventListener('click', () => {
        chatBody.classList.toggle('active');
        chatToggle.textContent = chatBody.classList.contains('active') ? '−' : '+';
    });
    
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            saveMessage(message, 'user');
            chatInput.value = '';
            
            setTimeout(() => {
                const response = "Thank you for your message. A staff member will respond shortly.";
                addMessage(response, 'system');
                saveMessage(response, 'system');
            }, 1000);
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chatSend.click();
    });
    
    loadChatHistory();
}

if (!window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', initChat);
}