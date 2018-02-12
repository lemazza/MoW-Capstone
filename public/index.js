
function randomHunter () {
  $.get("../api/hunters")
    .done(data => {
      let hunters = JSON.stringify(data);
      console.log(hunters);
    })
}

$(randomHunter)