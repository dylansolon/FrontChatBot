import viewHeader from '../views/header';
import viewBots from '../views/bots';
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
  }
};

export default Home;
