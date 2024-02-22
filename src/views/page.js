import toto from '../assets/img/toto.jpg';
import robot from '../assets/img/robot.png';
import naruto from '../assets/img/naruto.jpg';

export default () => (`
<header>
    <nav>
        <img src="robot.png" alt=""/>
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
                    <img src="${toto}" alt="Robot Icon">
                </div>
                <h1>Goku Bot</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
        <div class="leftItem" id="Bot-two">
            <div class="left__robotContainer">
                <div class="robot-icon">
                    <img src="${robot}" alt="Robot Icon">
                </div>
                <h1>Luffy Bot</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
        <div class="leftItem" id="Bot-three">
            <div class="left__robotContainer">
                <div class="robot-icon">
                    <img src="${naruto}" alt="Robot Icon">
                </div>
                <h1>Naruto Bot</h1>
            </div>
            <p>Lorem, ipsum dolor.</p>
            <p>2min</p>
        </div>
    </div>
</section>

    <section class="right">
        <div class="containerRight" id="conv1">
            <div class="containerRightTitle">
                <h1>Robot français</h1>
            </div>
            <ul class="chatbox">
                <li class="myTurn">
                    <div class="message-container">
                        <span class="message">User's message here</span>
                        <span class="timestamp">12:35 PM, 16 Feb 2024</span>
                    </div>
                </li>
                <li class="botTurn">
                    <h2 class="robot-name" style="font-size: 0.8rem;">Robot français</h2> <!-- Robot's name with smaller font size -->
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
