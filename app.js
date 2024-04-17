const JohnSelectorBtn = document.querySelector('#John-selector');
const JaneSelectorBtn = document.querySelector('#Jane-selector');
const ChatHeader = document.querySelector('.chat-header');
const ChatMessages = document.querySelector('.chat-messages');
const ChatInputForm = document.querySelector('.chat-input-form');
const ChatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const ChatMessageElement = (message) => `
  <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        ChatMessages.innerHTML += ChatMessageElement(message);
    });
};

let messageSender = 'John';

const updateMessageSender = (name) => {
    messageSender = name;
    ChatHeader.innerText = `${messageSender} chatting...`;
    ChatInput.placeholder = `Type here, ${messageSender}....`;
    if (name === 'John') {
        JohnSelectorBtn.classList.add('active-person');
        JaneSelectorBtn.classList.remove('active-person');
    }
    if (name === 'Jane') {
        JaneSelectorBtn.classList.add('active-person');
        JohnSelectorBtn.classList.remove('active-person');
    }
    ChatInput.focus();
};

JohnSelectorBtn.onclick = () => updateMessageSender('John');
JaneSelectorBtn.onclick = () => updateMessageSender('Jane');

const sendMessage = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: ChatInput.value,
        timestamp: timestamp,
    };
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    ChatMessages.innerHTML += ChatMessageElement(message);
    ChatInputForm.reset();
    ChatMessages.scrollTop = ChatMessages.scrollHeight;
};

ChatInputForm.addEventListener('submit', sendMessage);
clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    ChatMessages.innerHTML = '';
});
