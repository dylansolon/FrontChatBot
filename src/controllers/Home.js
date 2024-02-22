import viewHeader from '../views/header';
import viewBots from '../views/list-bots';
import viewChatbox from '../views/chatbox';

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

  run() {
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

  sendMessage(chatbox, messageInput, event) {
    const chatboxValue = chatbox;
    const messageInputValue = messageInput;

    const message = messageInputValue.value.trim();
    if (message !== '') {
      const now = new Date();
      const timestamp = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      const newMessage = `
        <li class="myTurn">
            <div class="message-container">
                <span class="message">${message}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
        </li>
      `;
      chatboxValue.innerHTML += newMessage;
      messageInputValue.value = '';

      event.preventDefault();
    }
  }
};

export default Home;
