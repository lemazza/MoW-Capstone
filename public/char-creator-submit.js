function watchClassChange () {
  //setup event handler
  $('input[name="classType"]').change(event=> {
    console.log("input changed");
    let classType = $('input[name="classType"]:checked').val();
    $('.classFields').hide();
    $(`#${classType}Form`).show();
  });
}






function watchSubmit() {
  //on submit take all form data and post to characters
  $('form').submit(function(event) {
    event.preventDefault();
    //build obj from form data
    const formData = $(this).serializeJSON({useIntKeysAsArrayIndex: true, parseBooleans: true});
    console.log('stringified form data is', JSON.stringify(formData));
    formData.creator= "5a9719577711a47330f50891";
    $.ajax({
      url: 'api/characters', 
      type: "POST",
      dataType: "json",
      data: JSON.stringify(formData),
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJOYW1lIjoibGVtYXp6YTExIiwicGFzc3dvcmQiOiJwYXNzd29yZDEyMyJ9LCJpYXQiOjE1MTk4NTE4ODgsImV4cCI6MTUyMDQ1NjY4OCwic3ViIjoibGVtYXp6YTExIn0.jx355D3boxvRCYH-Jd-I1ZFBSlaQ5iZpPFDx4t2RHSg",
        "Content-Type": "application/json"
      },
      success: function(res){
      console.log('succes', res)
      }
    }).fail((jqxhr, statusCode, statusText)=>{
      console.log('error', statusCode, statusText);
    });
  })
}


$(watchClassChange);
$(watchSubmit);