import bot from './bots';

const bots = [
  {
    id: 1,
    img: 'https://www.goodstickers.fr/4589/pokemon-bulbasaur.jpg',
    nom: 'Bulbizarre',
    msg: 'Previous message'
  },
  {
    id: 2,
    img: 'https://bricashirts.com/14455-large_default/tee-shirt-pokemon-salameche-blanc-sublimation.jpg',
    nom: 'Salameche',
    msg: 'Previous message'
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/736x/f6/a7/02/f6a702253807f4ee9b3a3891fdcf0128.jpg',
    nom: 'Carapuce',
    msg: 'Previous message'
  }
];

export default () => (`
<section class="left">
<div class="bot-container">
    <!-- Search bar -->
    <div class="search-bar">
        <input type="text" placeholder="Search...">
    </div>
  <div class="bot-container">
    ${bots.map((botData) => bot(botData)).join('')}
    </div>
</section>
`);
