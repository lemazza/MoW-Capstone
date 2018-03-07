

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
    console.log(postData);

    $.ajax({
      type: "POST",
      url: "/api/users", 
      data: postString, 
      dataType: "json",
      headers: {"Content-Type": "application/json"},
      success: function(data) {
        console.log("success! Here's proof:" , data);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("authToken", data.authToken);
        window.location.replace(`user/${data.id}`);
      },
      contentType: "application/json"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText || textStatus);
    });

  })
}

$(watchSubmit);