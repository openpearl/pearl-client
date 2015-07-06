module.exports = function(app) {
  app.factory('submitLogin', [
    '$http',
    submitLogin
  ]);

  app.factory('submitSignup', [
    '$http',
    submitSignup
  ]);
}

function submitLogin() {
  return function(email, password, callback) {

    console.log(callback);

    console.log("Login button pressed.");
    console.log("Email: " + email);
    console.log("Password: " + password);

    // FIXME: This part of the code is not DRY.
    if (email === undefined) {
      alert("Please enter your email.");
      return;
    }

    if (password.length === 0) {
      alert("Please enter your password.");
      return;
    }

    // Complete POST request and redirect.
    var route = CURRENT_HOST + "/api/v1/login/";
    var loginJson = {
      email: email,
      password: password
    }

    postInfo(route, loginJson, callback);
  } 
}

function submitSignup() {
  return function(name, email, password, confirmPassword, callback) {
    // Validate all information.

    if (name.length === 0) {
      alert("Please enter your name so we can start talking!");
      return;
    }

    if (email.length === 0) {
      alert("Please enter your email.");
      return;
    }

    if (password.length === 0) {
      alert("Please enter your password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Please make sure your password is correct.");
      return;
    }

    // Complete POST request and redirect.
    var route = CURRENT_HOST + "/api/v1/login/";
    var signUpJson = {
      name: name,
      email: email,
      password: password
    }

    postInfo(route, signUpJson, callback);
  }
}

function postInfo(route, jsonObj, callback) {

  console.log("Posting info.");

  // $http.post(route, loginJson).
  //   success(function(data, status, headers, config) {
  //     // this callback will be called asynchronously
  //     // when the response is available
  //     console.log("Logging in successful.");
  //     console.log(data.message);
      callback();
  //   }).
  //   error(function(data, status, headers, config) {
  //     alert("Error logging in.");
  //     console.log("Error logging  in.");
  //   });
}
