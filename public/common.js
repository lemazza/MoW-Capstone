const INVALID_USER_TOKEN = null;

function bearerAJAX(options){
    let cookies = cookieParser()
    let authToken = cookies.authToken || "invalid Token"
    if( !options.headers ){
        options.headers = {};
    }
    options.headers.Authorization = `Bearer ${authToken}`;
    if( options.dataType.toLowerCase() === 'json' ){
        options.headers["Content-Type"] = "application/json";
        if( typeof options.data !== 'string' ){
            options.data = JSON.stringify(options.data);
        }
    }
    return $.ajax(options);    
}

function postBearerJSON(url, data, successCallback, failureCallback){  
    bearerAJAX({
      url, 
      type: "POST",
      dataType: "json",
      data,
      success: successCallback
    }).fail(failureCallback);
}

function putBearerJSON(url, updateData, successCallback, failureCallback){
    bearerAJAX({
      url, 
      type: "PUT",
      dataType: "json",
      data: updateData,
      success: successCallback
    }).fail(failureCallback);    
}

function deleteBearerJSON(url, updateData, successCallback, failureCallback){
    bearerAJAX({
      url, 
      type: "DELETE",
      dataType: "json",
      data,
      success: successCallback
    }).fail(failureCallback);    
}

/*================================================================
      AUTO LOGIN VIA COOKIE
=================================================================*/
function cookieParser () {
  //finds cookies and returns an obj with key-value pairs
  cookies = document.cookie.split('; ')
    let cookieObj = {}
    cookies.forEach(cookie=>{
      let halves = cookie.split("=");
      cookieObj[halves[0]] = halves[1];
    })
    console.log("COOKIES!", cookieObj)
    return cookieObj;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

function formDisplay (main) {
  let inline = (main=== "main")? "" : 'class="form-inline"';
  let createNew = (main=== "main")? '<a href="new-user">Create new user</a>' : "";
  return `
    <form id="login-form" ${inline}>
      <div class="form-group">
        <label for="userName">username</label>
        <input class="form-control" id="userName" type="text" name="userName" required>
      </div>
      <div class="form-group">
        <label for="password">password</label>
        <input class="form-control" id="password" type="password" name="password" required>
      </div>
      <button class="btn btn-submit btn-std" type="submit">Log In</button>
    </form>
    ${createNew}
  `
}

function loggedInDisplay(userName, userId) {
  return `
    <span>Logged in as <a href="/user/${userId}" class="userName-text">${userName}</a></span>
    <button class="btn btn-sm btn-std logout-button">Log Out</button>
  `
}


function checkLogIn (main) {
  let cookies = cookieParser();
  let userName = cookies.userName;
  let userId = cookies.userId;
  let authToken = cookies.authToken;
  console.log("Cookie userName is", userName);
  console.log("Cookie userId is", userId);
  console.log("Cookie authToken is", authToken);
  
  let htmlOutput;
  if (userName) {
    htmlOutput = loggedInDisplay(userName, userId)
  } else {
    htmlOutput = formDisplay(main)
    //htmlOutput = formDisplay()
  }
  $('#login').html(htmlOutput);
}

/*==============================================================
      LOG IN / LOG OUT
===============================================================*/

function watchLogOut () {
  $('#login').on("click", ".logout-button", event=>{
    console.log("logout pressed")
    let cookies = cookieParser();
    delete_cookie("userName");
    delete_cookie("userId");
    delete_cookie("authToken");

    let stillCookies = cookieParser()
    console.log(stillCookies);
    window.location.href = "/"
  })
}


function watchLogIn () {
  $('#login').on("submit", "#login-form", function(event) {
    event.preventDefault();
    console.log('login attempt')
    let LoginData = {
      userName: $('input[name="userName"]').val(),
      password: $('input[name="password"]').val()
    }
    console.log(LoginData);
    $.ajax({
      type: "POST",
      url: "/api/auth/login", 
      data: JSON.stringify(LoginData), 
      dataType: "json",
      headers: {"Content-Type": "application/json"},
      success: function(data) {
        console.log("SUCCESS, Here's data:", data);
        setCookie('authToken', data.authToken, 7); 
        setCookie('userName', LoginData.userName, 7);
        setCookie('userId', data.userId, 7); 
        location.replace(`user/${data.userId}`);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        alert('there was a problem logging in: '+ textStatus + " " + errorThrown);
      }
    })
  })
}