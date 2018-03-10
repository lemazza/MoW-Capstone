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
      type: "POST",
      dataType: "json",
      data,
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