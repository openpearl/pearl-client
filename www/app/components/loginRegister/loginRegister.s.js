module.exports = function(app) {
  app.factory('LoginRegisterServ', [
    '$http',
    '$auth',
    'ApiEndpoint',
    LoginRegisterServ
  ]);
}

function LoginRegisterServ($http, $auth, ApiEndpoint) {

  var loginRegister = {
    submitLogin: submitLogin,
    submitRegister: submitRegister
  };

  function submitLogin(email, password) {

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
    var route = ApiEndpoint.url + "/auth/sign_in/";
    var loginJson = {
      email: email,
      password: password
    }

    $auth.submitLogin(loginJson)
      .then(function(resp) {
        console.log("Logged in.");
        console.log(resp);
      })
      .catch(function(resp) {
        console.log("Failed logging in.");
        console.log(resp);
      });
  }

  function submitRegister(name, email, password, confirmPassword) {

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
    var route = ApiEndpoint.url + "/auth/";
    var registerJson = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      confirm_success_url: "http://www.openpearl.org/"
    }

    $http.post(route, registerJson).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("Logging in successful.");
        console.log(data.message);
      }).
      error(function(data, status, headers, config) {
        console.error("Error sending register request.");
        console.log(jsonObj);
      });
  }

  return loginRegister;
}
