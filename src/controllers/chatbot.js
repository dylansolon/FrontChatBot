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
    const data = {
      bots,
      messages
    };
    this.el.innerHTML = this.render(data);

    // Récupérer la boîte de chat
    const chatbox = document.querySelector('.chatbox');

    // Afficher les messages dans la boîte de chat
    messages.forEach((message) => {
      const messageHTML = `
      <li class="${message.userId ? 'myTurn' : 'botTurn'}">
        <h2 class="robot-name">${message.userId ? '' : message.botName}</h2>
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
      const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

      // Création du nouveau message de l'utilisateur
      const newMessage = `
            <li class="myTurn">
                <div class="message-container">
                    <span class="message">${userMessage}</span>
                    <span class="timestamp">${timestamp}</span>
                </div>
            </li>
        `;

      // Ajout du message de l'utilisateur à la boîte de chat
      chatbox.innerHTML += newMessage;
      messageInput.value = '';

      // Envoi du message de l'utilisateur au serveur
      await axios.post('http://127.0.0.1/messages', {
        botId: null,
        botName: '',
        userId: 1,
        text: userMessage
      });

      // Récupération des données des bots depuis le serveur
      const bots = await this.fetchBotsData();
      const botResponses = [];

      await Promise.all(bots.map(async (bot) => {
        // Vérification des actions du bot
        if (bot.actions) {
          // Parcours de toutes les actions du bot
          await Promise.all(bot.actions.map(async (action) => {
            // Vérification si l'action correspond au message de l'utilisateur
            if (action.words && action.words.includes(userMessage.toLowerCase())) {
              // Création de la réponse du bot
              const botResponse = `
                        <li class="botTurn">
                            <h2 class="robot-name">${bot.name}</h2>
                            <div class="message-container">
                                <span class="message">${action.response}</span>
                                <span class="timestamp">${timestamp}</span>
                            </div>
                        </li>
                    `;
              // Ajout de la réponse du bot au tableau des réponses
              botResponses.push(botResponse);

              // Envoi de la réponse du bot au serveur
              await axios.post('http://127.0.0.1/messages', {
                botId: bot.id,
                botName: bot.name,
                userId: null,
                text: action.response
              });
            }
          }));
        }
      }));

      // Si des réponses ont été trouvées, les ajouter à la boîte de chat
      if (botResponses.length > 0) {
        chatbox.innerHTML += botResponses.join('');
      }

      // Faire défiler la boîte de chat jusqu'en bas
      this.scrollChatboxToBottom();
    }
  }

  scrollChatboxToBottom() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}

export default ChatBot;
