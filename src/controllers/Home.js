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
      <div class="container">
        <div class="row">
          <div class="col-12">${viewHeader()}</div>
        </div>
        <main>
        <div class="row">
          <div class="col-3">${viewBots()}</div>
        </div>
        <div class="row">
          <div class="col-9">${viewChatbox()}</div>
        </div>
      </div>
      </main>
    `;
  }

  run() {
    const content = this.render();
    this.el.innerHTML = content;
  }
};

export default Home;
