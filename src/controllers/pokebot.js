import axios from 'axios';

import viewHeader from '../views/header';
import viewBots from '../views/listebots';
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
        pierre: "Pierre est le leader de l'arène d'Argenta !",
        ondine: "Ondine dirige l'arène d'Azuria.",
        'major bob': 'Tu dois te rendre à Carmin sur Mer !',
        50: async () => {
          const pokemonNames = await this.fetchPokemonNames();
          const formattedNames = pokemonNames.join(', ');
          this.botRespond(`Les 50 premiers Pokémon de la première génération en français sont : ${formattedNames}`, timestamp);
        }
      };

      Object.keys(responses).forEach((keyword) => {
        if (lowercaseMessage.includes(keyword)) {
          if (typeof responses[keyword] === 'function') {
            responses[keyword]();
          } else {
            this.botRespond(responses[keyword], timestamp);
          }
        }
      });

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

  botRespond(response, timestamp) {
    const chatboxValue = document.querySelector('.chatbox');
    const botResponse = `
      <li class="botTurn">
        <h2 class="robot-name" style="font-size: 0.8rem;">Bot-one</h2>
        <div class="message-container">
          <span class="message">${response}</span>
          <span class="timestamp">${timestamp}</span>
        </div>
      </li>
    `;
    chatboxValue.innerHTML += botResponse;
  }
};

export default Home;
