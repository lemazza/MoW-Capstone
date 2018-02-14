
function watchSubmit () {
  $("form").submit(function(event) {
    event.preventDefault();

    let postData = {
    password: $('#pwd').val(),
    firstName: $('#fname').val(),
    lastName: $('#lname').val(),
    email: $('#email').val(),
    userName: $('#uname').val()
    }

    let postString = JSON.stringify(postData);

    $.ajax({
      type: "POST",
      url: "/api/users", 
      data: postString,
      dataType: "json"
    })
    .done(function(data) {
        console.log("success! Here's proof:" , data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText || textStatus);
    });

  })
}

$(watchSubmit);