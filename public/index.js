

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

function loggedInDisplay(userName) {
  return `
    <p>Logged in as <span class="userName-text">${userName}</span></p>
    <button class="logout-button">Log Out</button>
  `
}


function checkLogIn () {
  let userName = localStorage.getItem('userName');
  let userId = localStorage.getItem('userId');
  let authToken = localStorage.getItem('authToken');
  console.log("localStorage userName is", userName);
  console.log("localStorage userId is", userId);
  console.log("localStorage authToken is", authToken);
  let htmlOutput;
  if (userName) {
    htmlOutput = loggedInDisplay(userName)
  } else {
    htmlOutput = formDisplay()
  }
  $('#login').html(htmlOutput);
}

/*==============================================================
      LOG IN / LOG OUT
===============================================================*/

function watchLogOut () {
  $('#login').on("click", ".logout-button", event=>{
    localStorage.clear();
    location.reload();
  })
}


function watchLogIn () {
  $('#login').on("submit", ".login-form", function(event) {
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
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('userName', LoginData.userName);
        location.reload();
      }
    })
  })
}

$(watchLogIn)
$(watchLogOut)
$(checkLogIn)
$(randomHunter)