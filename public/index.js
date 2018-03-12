

function displayHunterTemplate (character) {
  return `
    <h2>${character.name}</h2>
    <h3>${character.class}</h3>
    <image src="${character.image}" alt="${character.name}">
    <p>${character.description}</p>

  `
}


function randomHunter () {
  $.get("../api/characters/random")
    .done(character => {
      $('#randomChar').html(displayHunterTemplate(character));
    })
}


/*================================================================
      LOG-IN STUFF
=================================================================*/
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

function formDisplay () {
  return `
    <form class="login-form">
      <legend>Log in or create an account</legend>
      <label>user name</label>
      <input type="text" name="userName" required>
      <label>password</label>
      <input type="password" name="password" required>
      <button type="submit">Log In</button>
    </form>
    <a href="newuser.html">Create new user</a>
  `
}

function loggedInDisplay(userName, userId) {
  return `
    <span>Logged in as <a href="user/${userId}" class="userName-text">${userName}</a></span>
    <button class="logout-button">Log Out</button>
  `
}


function checkLogIn () {
  let cookies = cookieParser();
  let userName = cookies.userName;
  let userId = cookies.userId;
  let authToken = cookies.authToken;
  console.log("Cookie userName is", userName);
  console.log("Cookie userId is", userId);
  console.log("Cookie authToken is", authToken);
  console.log("COOKIE!", document.cookie);
  
  let htmlOutput;
  if (userName) {
    htmlOutput = loggedInDisplay(userName, userId)
  } else {
    htmlOutput = 'Please <a href="/" alt="login page">Log In</a>'
    //htmlOutput = formDisplay()
  }
  $('#login').html(htmlOutput);
}

/*==============================================================
      LOG IN / LOG OUT
===============================================================*/

function watchLogOut () {
  $('#login').on("click", ".logout-button", event=>{
    let cookies = cookieParser();
    delete_cookie("userName");
    delete_cookie("userId");
    delete_cookie("authToken");
    delete_cookie("password"); 
    location.reload();
  })
}


function watchLogIn () {
  $('#login-form').submit(function(event) {
    event.preventDefault();
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
        document.cookie = `authToken=${data.authToken}` 
        document.cookie = `userName=${LoginData.userName}` 
        document.cookie = `userId=${data.userId}` 
        location.replace(`user/${data.userId}`);
      }
    })
  })
}

$(watchLogIn)
$(watchLogOut)
$(checkLogIn)
$(randomHunter)