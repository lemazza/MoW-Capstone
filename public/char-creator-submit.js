function watchSubmit() {
  //on submit take all form data and post to characters
  $('form').submit(event=>{
    event.preventDefault();
    //build obj from form data
    let char = {
      name: $('input[name="char-name"]').val(),
      class: $('input[name="classType"]:checked').val(),
      look: discoverLook(),
      ratings: $('#ratings').find('input[name="ratings-option"]:checked').val(),
      moves: discoverMoves(),
      gear: discoverGear(),
      history: discoverHistory()

    }
    console.log('char is', char);
  })
}



function discoverLook () {
  //return an object with sub key-val objects for each question
  return "need to build discoverLook";
}



function discoverMoves() {
  let array = [];
  let moves = $('#moves').find('input[name="moves"]:checked')

  moves.each((index,move)=>{
    array.push(move.value);  
  })
  return array;
}


function discoverGear() {
  let array = [];
  let gear = $('#gear').find('input[name="gear"]:checked');

  gear.each((index, item)=>{
    array.push(item.value);
  })
  return array;
}


function discoverHistory() {
  let array = []
  let history = $('#history').find('input[name="history"]:checked');
  console.log(history[0].nextSibling.value);
  history.each((index, hist)=>{
    let playerObj = {
      name: hist.nextSibling.value, 
      history: hist.value, 
    }
    array.push(playerObj)
  })
  return array;
}


$(watchSubmit);