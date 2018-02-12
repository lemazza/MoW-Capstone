
function randomHunter () {
  $.get("../api/characters/random")
    .done(data => {
      let characters = JSON.stringify(data);
      console.log(characters);
    })
}

$(randomHunter)