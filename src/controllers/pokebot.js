import axios from 'axios';

import viewHeader from '../views/header';
import viewBots, { bots } from '../views/listebots';
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

      const lowercaseMessage = message.toLowerCase();

      const responses = {
        bonjour: {
          message: 'Ohayo Gozaimasu !',
          botIds: [1, 2, 3]
        },
        pierre: {
          message: "Pierre est le leader de l'arène d'Argenta !",
          botIds: [1]
        },
        ondine: {
          message: "Ondine dirige l'arène d'Azuria.",
          botIds: [2]
        },
        'major bob': {
          message: 'Tu dois te rendre à Carmin sur Mer !',
          botIds: [3]
        },
        50: {
          message: async () => {
            const pokemonNames = await this.fetchPokemonNames();
            const formattedNames = pokemonNames.join(', ');
            this.botRespond(`Les 50 premiers Pokémon de la première génération en français sont : ${formattedNames}`, timestamp);
          },
          botIds: [1]
        }
      };

      Object.keys(responses).forEach((keyword) => {
        if (lowercaseMessage.includes(keyword)) {
          const { message, botIds } = responses[keyword];
          botIds.forEach(botId => {
            this.botRespond(message, timestamp, botId);
          });
        }
      });

      this.scrollChatboxToBottom();

      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }

  async fetchPokemonNames() {
    const pokemonNames = [];
    const requests = [];

    for (let i = 1; i <= 50; i += 1) {
      requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`));
    }

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      const pokemonName = response.data.names.find((name) => name.language.name === 'fr').name;
      pokemonNames.push(pokemonName);
    });

    return pokemonNames;
  }

  botRespond(response, timestamp, botId) {
    const chatboxValue = document.querySelector('.chatbox');
    const botName = bots.find(bot => bot.id === botId).nom;
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
  }

  scrollChatboxToBottom() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
};

export default Home;
