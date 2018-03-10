//user-page.js
function getLocals() {
  console.log("userName:", localStorage.getItem("userName"));
  console.log("authToken:", localStorage.getItem("authToken"));
}
/*
function checkEdit() {
  $('#edit-user').click(event=>{
    event.preventDefault();
    let authToken = localStorage.getItem("authToken");
    $.ajax({
      type: "GET",
      url: "./edit",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
      success: function(data) {
        console.log(data)
        window.location.assign(data)
      }
    })
  })
}


$(checkEdit);*/
$(getLocals);