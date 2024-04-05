const chatbox = (data) => `
<section class="right" id="${data.id}">
  <div class="containerRight">
    <div class="containerRightTitle">
      <h1>Chatbox</h1>
    </div>
    <ul class="chatbox" id="chatbox">
      <!-- Messages seront ajoutés ici dynamiquement -->
    </ul>
    <div class="containertextarea">
      <textarea id="messageInput" placeholder="Write here..." type="text" class="input"></textarea>
      <i id="sendButton" class="ri-send-plane-fill"></i>
    </div>
  </div>
</section>
`;

export default chatbox;
