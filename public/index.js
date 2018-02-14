

function displayHunterTemplate (character) {
  return `
    <h1>${character.name}</h1>
    <h2>${character.class}</h2>
    <image src="${character.image}" alt="${character.name}">
    <ul>
      <li>Charm: ${character.charm}</li>
      <li>Cool: ${character.cool}</li>
      <li>Tough: ${character.tough}</li>
      <li>Sharp: ${character.sharp}</li>
      <li>Weird: ${character.weird}</li>
    </ul>
    <p>${character.description}</p>

  `
}





function randomHunter () {
  $.get("../api/characters/random")
    .done(character => {
      console.log(typeof character);
      $('#randomChar').html(displayHunterTemplate(character));
    })
}

$(randomHunter)