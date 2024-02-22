export default ({ id, img, nom, msg }) => (`
  <div class="leftItem" id="${id}">
    <div class="left__robotContainer">
      <div class="robot-icon">
        <img src="${img}" alt="${nom}">
      </div>
      <h1>${nom}</h1>
    </div>
    <p>${msg}</p>
    <p>2min</p>
  </div>
`);
