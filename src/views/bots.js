const botItem = (data) => `
  <div class="leftItem" id="${data.id}">
    <div class="left__robotContainer">
      <div class="robot-icon">
        <img src="${data.avatar}" alt="${data.name}">
      </div>
      <h1>${data.name}</h1>
    </div>
  </div>
`;

const bots = (data) => `
  <section class="left">
    <div class="bot-container">
      <div class="search-bar">
        <input type="text" placeholder="Search...">
      </div>
      <div class="bot-container">
        ${data.map((bot) => botItem(bot)).join('')}
      </div>
    </div>
  </section>
`;

export default bots;
