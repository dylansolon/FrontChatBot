import Icon from '../assets/img/logo.png';
import Left from '../assets/img/noctali.png';
import Right from '../assets/img/gengar.png';

export default () => (`
<header>
    <nav>
      <div class="logo-container">
          <img src="${Left}" class="logo" alt="Left Picture"/>
      </div>
      <div class="center-content">
          <img src="${Icon}" alt="Icon Header"/>
          <h1><span>PokeBot.io</span></h1>
      </div>
      <div class="logo-container">
          <img src="${Right}" class="logo" alt="Right Picture"/>
      </div>
    </nav>
</header>
`);
