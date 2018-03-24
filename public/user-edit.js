
function watchSubmit () {
  $("#edit-user").submit(function(event) {
    event.preventDefault();

    let cookies = cookieParser();

    let postData = {
    firstName: $('#fname').val(),
    lastName: $('#lname').val(),
    email: $('#email').val(),
    id: cookies.userId
    }

    let postString = JSON.stringify(postData);
    console.log(postData);


    $.ajax({
      type: "PUT",
      url: `/api/users/${cookies.userId}`, 
      data: postString, 
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${cookies.authToken}`,
        "Content-Type": "application/json"},
      success: function(data) {
        window.location.replace(`${data.id}`);
      },
      contentType: "application/json"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText || textStatus);
        alert(jqXHR.responseText || textStatus);
    });

  })
}

function watchDelete() {
  $('#user-delete').click(event=>{
    event.preventDefault();
    console.log("delete clicked")
    let cookies = cookieParser();
    let userId = cookies.userId;
    console.log(userId)

    $.ajax({
      type: "DELETE",
      url: `/api/users/${userId}`,
      data: {id: userId}
    })
    .then(()=>{
      delete_cookie("userName");
      delete_cookie("userId");
      delete_cookie("authToken"); 
      window.location.replace(`./../`);   
    })
  })
}


$(watchDelete);
$(watchSubmit);

//from common
$(watchLogIn);
$(watchLogOut);
$(checkLogIn);
