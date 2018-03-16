

function displayHunterTemplate (character) {
  return `
    <h2>${character.name}</h2>
    <h3>${character.class}</h3>
    <image src="${character.image}" alt="${character.name}">
    <p>${character.description}</p>

  `
}


function randomHunter () {
  $.get("../api/characters/random")
    .done(character => {
      $('#randomChar').html(displayHunterTemplate(character));
    })
}


$(randomHunter)

//from common
$(watchLogIn);
$(watchLogOut);
$(checkLogIn);