//client js


function watchClassChange () {
  //setup event handler
  $('input[name="classType"]').change(event=> {
    console.log("input changed");
    //read class type.  Need to add validator here so its lowercase, trimmed, and one of the 12 class types
    let classType = $('input[name="classType"]:checked').val();

    seedFields(classType);
    //use class type to inform object how to seed form fields
    //seed fields
  });
}



function seedFields (hunterClass) {
  renderLook(hunterClass);
  renderRatings(hunterClass);
  renderMoves(hunterClass);
  renderGear(hunterClass);
  renderHistory(hunterClass);
  renderImprovements(hunterClass);
  renderAdvImp(hunterClass);
};


/*
=======================================================================================================

  RENDERERS

=======================================================================================================
*/


function renderLook (hunterClass) {
  let html = ""
  let look = DATA[hunterClass].look;
  //for each of data.hunterClass.look display key as question and loop through array to create radios
  for (var key in look) {
    html = html.concat(`
      <p class="question">Choose ${key}</p>
    `)
    look[key].forEach(item=>{
      html = html.concat(`
        <label><input type="radio" name="looks[${key}]" value="${item}">${item}</label><br>
      `)
    })
  }
  $('#look').html(html);
}



function renderRatings (hunterClass) {
  let ratings = DATA[hunterClass].ratings;
  let html = "";
  let counter = 0;

  ratings.forEach(ratingSet => {
    let rateString = ratingSet.join(',');
    html= html.concat(`
      <label><input type="radio" name="ratings-option" value="option${counter}">${rateString}</label><br>
    `);
    counter +=1;
  })
  $('#ratings').html(html);
}



function renderMoves (hunterClass) {
  let moves = DATA[hunterClass].moves;
  let html = "";
  counter = 0;

  moves.options.forEach(move=>{
    html = html.concat(`
      <label><input type="checkbox" name="moves" value="${move.name}">${move.name}</label><br>
      <p>${move.description}</p>
    `)
    counter +=1;
  })
  $('#moves').html(html);
}



function renderGear (hunterClass) {
  let gear = DATA[hunterClass].gear;
  let html = "";
  let counter = 0;

  gear.options.forEach(item => {
    html = html.concat(`
      <label><input type="checkbox" name="gear" value="${item}">${item}</label><br>
    `)
    counter +=1;
  })
  $('#gear').html(html);
}



function renderHistory (hunterClass) {
  let history = DATA[hunterClass].history;
  let html = ""
  let counter = 0;

  history.forEach(choice=>{
    html = html.concat(`
      <label><input type="checkbox" name="history" value="history${counter}"><input type="text">${choice}</label><br>
    `)
    counter +=1;
    $('#history').html(html);
  })
}



function renderImprovements (hunterClass) {
  let improvements = DATA[hunterClass].improvements
  let html = "";
  let counter = 0

  improvements.forEach(imp=>{
    html = html.concat(`
      <label><input type="checkbox" name="imp${counter}" value="imp${counter}">${imp}</label><br>
    `)
    counter +=1;
  })

  $('#improvements').html(html);
}



function renderAdvImp (hunterClass) {
  let advImp = DATA[hunterClass].advancedImprovements;
  let html = "";
  let counter = 0;

  advImp.forEach(adv=>{
    html = html.concat(`
      <label><input type="checkbox" name="adv-imp${counter}" value="adv-imp${counter}">${adv}</label><br>
    `)
    counter +=1;
  })

  $('#adv-improvements').html(html);
}




$(watchClassChange);