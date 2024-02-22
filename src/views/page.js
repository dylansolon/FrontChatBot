import icon from '../assets/img/robot.png';
import bot1 from '../assets/img/bulbizarre.jpg';
import bot2 from '../assets/img/salameche.jpg';
import bot3 from '../assets/img/carapuce.jpg';

export default () => (`
<header>
    <nav>
        <img src="${icon}" alt="Icon Header"/>
        <h1>Chatbot.io</h1>
    </nav>
</header>
<main>
  <section class="left">
    <div class="bot-container">
        <!-- Search bar -->
        <div class="search-bar">
            <input type="text" placeholder="Search...">
        </div>
        <div class="leftItem" id="Bot-one">
            <div class="left__robotContainer">
                <div class="robot-icon">
                    <img src="${bot1}" alt="Robot Icon">
                </div>
                <h1>Bulbizarre</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
        <div class="leftItem" id="Bot-two">
            <div class="left__robotContainer">
                <div class="robot-icon">
                    <img src="${bot2}" alt="Robot Icon">
                </div>
                <h1>Salameche</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
        <div class="leftItem" id="Bot-three">
            <div class="left__robotContainer">
                <div class="robot-icon">
                    <img src="${bot3}" alt="Robot Icon">
                </div>
                <h1>Carapuce</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
    </div>
</section>

    <section class="right">
        <div class="containerRight" id="conv1">
            <div class="containerRightTitle">
                <h1>Nom du bot</h1>
            </div>
            <ul class="chatbox">
                <li class="myTurn">
                    <div class="message-container">
                        <span class="message">User's message here</span>
                        <span class="timestamp">12:35 PM, 16 Feb 2024</span>
                    </div>
                </li>
                <li class="botTurn">
                    <h2 class="robot-name" style="font-size: 0.8rem;">Nom du bot</h2> <!-- Robot's name with smaller font size -->
                    <div class="message-container">
                        <span class="message">Bot's message here</span>
                        <span class="timestamp">12:30 PM, 16 Feb 2024</span>
                    </div>
                </li>
            </ul>
              <div class="containertextarea">
                  <input placeholder="Write here..." type="text" class="input">
                  <a href="" class="send"><i class="ri-send-plane-fill"></i></a>
              </div>
    </section>
</main>
`);
