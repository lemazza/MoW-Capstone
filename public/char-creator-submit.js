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

function watchSubmit() {
  //on submit take all form data and post to characters
  $('form').submit(function(event) {
    event.preventDefault();
    let authToken = localStorage.getItem('authToken') || "invalid Token"
    let userId = localStorage.getItem('userId') || "invalid user ID"
    //build obj from form data
    const formData = $(this).serializeJSON({useIntKeysAsArrayIndex: true, parseBooleans: true});
    formData.creator= userId;
    $.ajax({
      url: 'api/characters', 
      type: "POST",
      dataType: "json",
      data: JSON.stringify(formData),
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      success: function(res){
      console.log('succes', res)
      window.location.replace(`character/${res.id}`)
      }
    }).fail((jqxhr, statusCode, statusText)=>{
      console.log('error statuscode is', statusCode);
      console.log('error statustext is', statusText );
    });
  })
}

$(readLocalStorage);
$(watchClassChange);
$(watchSubmit);