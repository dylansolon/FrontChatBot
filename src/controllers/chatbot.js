import axios from 'axios';
import viewHeader from '../views/header';
import viewChatbox from '../views/chatbox';
import viewBots from '../views/bots';

class ChatBot {
  constructor(params, pageView) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.pageView = pageView;

    this.run();
  }

  async fetchMessagesData() {
    const response = await axios.get('http://127.0.0.1/messages');
    return response.data;
  }

  async fetchBotsData() {
    const response = await axios.get('http://127.0.0.1/bots');
    return response.data;
  }

  async fetchUsersData() {
    const response = await axios.get('http://127.0.0.1/user/1');
    return response.data;
  }

  eventSendMessage() {
    const sendButton = document.querySelector('.ri-send-plane-fill');
    const messageInput = document.querySelector('.input');
    const chatbox = document.querySelector('.chatbox');

    sendButton.addEventListener('click', (event) => {
      if (event.key === 'click') {
        this.sendMessage(chatbox, messageInput);
      }
    });

    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage(chatbox, messageInput);
      }
    });
  }

  render(data) {
    return `
        ${viewHeader()}
      <main>
        ${viewBots(data.bots)}
        ${viewChatbox(data.bots)}
      </main>
    `;
  }

  async run() {
    const bots = await this.fetchBotsData();
    const messages = await this.fetchMessagesData();
    const users = await this.fetchUsersData();
    const data = {
      bots,
      messages,
      users
    };
    this.el.innerHTML = this.render(data);

    // Récupérer la boîte de chat
    const chatbox = document.querySelector('.chatbox');

    // Afficher les messages dans la boîte de chat
    messages.forEach(message => {
      const messageHTML = `
      <li class="${message.userId ? 'myTurn' : 'botTurn'}">
        <h2 class="robot-name">${message.userId ? 'You' : message.botName}</h2>
        <div class="message-container">
          <span class="message">${message.text}</span>
          <span class="timestamp">${message.date}</span>
        </div>
      </li>
    `;

      chatbox.innerHTML += messageHTML;
    });

    this.eventSendMessage();
    this.scrollChatboxToBottom();
  }

  async sendMessage(chatbox, messageInput) {
    const userMessage = messageInput.value.trim();

    if (userMessage !== '') {
      const now = new Date();
      const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}
    ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      const newMessage = `
          <li class="myTurn">
            <div class="message-container">
            <span class="message">${userMessage}</span>
              <span class="timestamp">${timestamp}</span>
            </div>
          </li>
        `;

      chatbox.innerHTML += newMessage;
      messageInput.value = '';

      await axios.post('http://127.0.0.1/messages', {
        botId: null,
        userId: 1,
        text: userMessage
      });

      const response = 'This is a simulated bot response.';
      const botName = 'hello world';

      const botResponse = `
        <li class="botTurn">
          <h2 class="robot-name">${botName}</h2>
          <div class="message-container">
            <span class="message">${response}</span>
            <span class="timestamp">${timestamp}</span>
          </div>
        </li>
      `;
      chatbox.innerHTML += botResponse;

      await axios.post('http://127.0.0.1/messages', {
        botId: 3,
        userId: null,
        text: response
      });

      this.scrollChatboxToBottom();
    }
  }

  scrollChatboxToBottom() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

export default ChatBot;
