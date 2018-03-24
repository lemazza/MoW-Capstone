function watchClassChange () {
  //setup event handler
  $('input[name="classType"]').change(event=> {
    console.log("input changed");
    let classType = $('input[name="classType"]:checked').val();
    $('.classFields').hide(false);
    $(`#${classType}Form`).show();
  });
}




function charCreateSuccess(res){
  console.log('succes', res)
  window.location.replace(`character/${res.id}`)
}

function charPutSuccess(res){
  console.log('succes', res)
  window.location.href = `../${res.id}`
}

function charCreateFailure(jqxhr, statusCode, statusText){
  console.log('error statuscode is', statusCode);
  console.log('error statustext is', statusText );
  alert(`Error! ${statusCode} ${statusText}`)
}

function failureRedirectFn(redirectURL){
    return function(jqxhr, statusCode, error){
        console.error(error);
        alert(error);
        window.location.href = redirectURL;
    }
}

function cookieParser () {
  //finds cookies and returns an obj with key-value pairs
  cookies = document.cookie.split('; ')
    console.log(cookies);
    let cookieObj = {}
    cookies.forEach(cookie=>{
      let halves = cookie.split("=");
      cookieObj[halves[0]] = halves[1];
    })
    console.log("COOKIES!", cookieObj)
    return cookieObj;
}


function sliceCharId (url) {
  let charIndex = url.indexOf('character');
  let editIndex = url.indexOf('/edit');
  let str = url.slice(charIndex+10, editIndex);
  return str
}



function watchSubmit() {

//on submit take all form data and post to characters
  $('form').submit(function(event) {
    event.preventDefault();
    let cookies = cookieParser();   
    //build obj from form data
    const formData = $('form').serializeJSON({useIntKeysAsArrayIndex: true, parseBooleans: true});
    let userId = cookies.userId || INVALID_USER_TOKEN;
    formData.creator= userId;
    
    if ($('#put-button').length) {
      let charId = sliceCharId(window.location.href);
      let putUrl = '/api/characters/' + charId;
      formData.id = charId;
      formData.name = formData.charName;
      formData.class = formData.classType;
      formData.image = formData.characterImage;
      putBearerJSON(putUrl, formData, charPutSuccess, failureRedirectFn(`../${charId}`))  
    } else {
      postBearerJSON('/api/characters', formData, charCreateSuccess, failureRedirectFn("/characters"))
    }
  })
}

function watchDelete() {
  $('#delete-button').click(event=>{
    event.preventDefault();
    let charId = $('#delete-button').attr('data-charId')
    console.log("charId", charId);

    $.ajax({
      type: "DELETE",
      url: `/api/characters/${charId}`,
      data: {id: charId}
    })
  })
}

function watchNameChange() {
  $('.user-history').on('change', '.hist-name', function (event) {
    event.preventDefault();
    let name = $(this).val();
    let checkField = $(this).prev();

    let checkedBoolean = (name.length)? true : false;
    $(checkField).prop('checked', checkedBoolean);

   
  })
}


function watchHistChecks() {
  $('.user-history').on('change', '.hist-check', function (event) {
    event.preventDefault();
    console.log('check changed')

    let checkValue = $(this).prop('checked');
    let nameField = $(this).next();
    let name = nameField.val();
    let placeholder = nameField.attr('placeholder');

    console.log('in histchecks: checkVal, name', checkValue, name);
    if(!checkValue || name.length) {
      //name is there and unchecked
      console.log('should be placeholder')
      $(nameField).val('');
      $(nameField).attr('placeholder', name)
    } else if (checkValue || placeholder.length) {
      console.log('should be val')
      $(nameField).val(name);
      $(nameField).attr('placeholder', '')

    }
  })
}


function watchHistory () {
  watchNameChange();
//  watchHistChecks();
}


function updateNameInDangerBox () {
  $('input[name="charName"]').change(function(event){

    let nameValue = $(this).val();
    let dangerBox = $('.danger-box')

    console.log(nameValue , dangerBox );
    if(dangerBox.length) {
      dangerBox.find('strong').val(nameValue);
    }
  })
}


$(watchHistory);
$(watchDelete);
$(watchClassChange);
$(watchSubmit);

//bootstrap
//$('.carousel').carousel()


//from common
$(watchLogIn);
$(watchLogOut);
$(checkLogIn);