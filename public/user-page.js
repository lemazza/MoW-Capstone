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

$(checkLogIn);