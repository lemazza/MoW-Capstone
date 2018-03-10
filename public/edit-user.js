
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



function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function watchSubmit () {
  $("form").submit(function(event) {
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