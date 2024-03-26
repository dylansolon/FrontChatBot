import axios from 'axios';

import viewHeader from '../views/header';
import viewBots, { bots } from '../views/listebots';
import viewChatbox from '../views/chatbox';

async function fetchMessage() {
  try {
    const response = await axios.get('http://localhost/messages');
    return response.data;
  } catch (error) {
    return null;
  }
}

const Home = class {
  constructor(params, pageView) {
    this.el = document.querySelector('#root');
    this.params = params;
    this.pageView = pageView;

    this.run();
  }

  render() {
    return `
        ${viewHeader()}
      <main>
        ${viewBots()}
        ${viewChatbox()}
      </main>
    `;
  }

  async run() {
    const content = this.render();
    this.el.innerHTML = content;
    this.setupEventListeners();
  }

  setupEventListeners() {
    const sendButton = document.querySelector('.ri-send-plane-fill');
    const messageInput = document.querySelector('.input');
    const chatbox = document.querySelector('.chatbox');

    sendButton.addEventListener('click', (event) => {
      this.sendMessage(chatbox, messageInput, event);
    });

    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.sendMessage(chatbox, messageInput, event);
      }
    });
  }

  async sendMessage(chatbox, messageInput, event) {
    const chatboxValue = chatbox;
    const messageInputValue = messageInput;

    const userMessage = messageInputValue.value.trim();
    if (userMessage !== '') {
      const now = new Date();
      const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      const newMessage = `
        <li class="myTurn">
          <div class="message-container">
            <span class="message">${userMessage}</span>
            <span class="timestamp">${timestamp}</span>
          </div>
        </li>
      `;
      chatboxValue.innerHTML += newMessage;
      messageInputValue.value = '';

      const lowercaseMessage = userMessage.toLowerCase();

      const { bonjour } = await fetchMessage();
      const { pierre } = await fetchMessage();
      const { ondine } = await fetchMessage();
      const { majorBob } = await fetchMessage();

      const responses = {
        bonjour: {
          message: bonjour,
          botIds: [1, 2, 3]
        },
        pierre: {
          message: pierre,
          botIds: [1]
        },
        ondine: {
          message: ondine,
          botIds: [2]
        },
        'major bob': {
          message: majorBob,
          botIds: [3]
        }
      };

      Object.keys(responses).forEach((keyword) => {
        if (lowercaseMessage.includes(keyword)) {
          const { message, botIds } = responses[keyword];
          botIds.forEach((botId) => {
            this.botRespond(message, timestamp, botId);
          });
        }
      });

      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }

  botRespond = (response, timestamp, botId) => {
    const chatboxValue = document.querySelector('.chatbox');
    const botName = bots.find((bot) => bot.id === botId).nom;
    const botResponse = `
      <li class="botTurn">
        <h2 class="robot-name" style="font-size: 0.8rem;">${botName}</h2>
        <div class="message-container">
          <span class="message">${response}</span>
          <span class="timestamp">${timestamp}</span>
        </div>
      </li>
    `;
    chatboxValue.innerHTML += botResponse;

    this.scrollChatboxToBottom();
  };

  scrollChatboxToBottom() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
};

export default Home;
