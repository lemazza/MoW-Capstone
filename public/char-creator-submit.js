function watchClassChange () {
  //setup event handler
  $('input[name="classType"]').change(event=> {
    console.log("input changed");
    let classType = $('input[name="classType"]:checked').val();
    $('.classFields').hide();
    $(`#${classType}Form`).show();
  });
}

function readLocalStorage () {
  let authToken = localStorage.getItem('authToken');
    let userId = localStorage.getItem('userId');
    console.log("userId:", userId, "authToken", authToken);
}


function charCreateSuccess(res){
  console.log('succes', res)
  window.location.replace(`character/${res.id}`)
}

function charCreateFailure(jqxhr, statusCode, statusText){
  console.log('error statuscode is', statusCode);
  console.log('error statustext is', statusText );
}

function failureRedirectFn(redirectURL){
    return function(jqxhr, statusCode, error){
        console.error(error);
        alert(error);
        window.location.href = redirectURL;
    }
}


function watchSubmit() {

//on submit take all form data and post to characters
  $('form').submit(function(event) {
    event.preventDefault();
    
    
    //build obj from form data
    const formData = $(this).serializeJSON({useIntKeysAsArrayIndex: true, parseBooleans: true});
    let userId = localStorage.getItem('userId') || INVALID_USER_TOKEN;
    formData.creator= userId;
      
    postBearerJSON('/api/characters', formData, charCreateSuccess, failureRedirectFn("/characters"))  
    
  })
}

$(readLocalStorage);
$(watchClassChange);
$(watchSubmit);