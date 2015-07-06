module.exports = function(app) {
  app.controller('LoginSignUpController', [
    "$http",
    "$state",
    LoginSignUpController
  ]);
}

function LoginSignUpController($http, $state) {
  var vm = this;

  vm.name = '';
  vm.email = '';
  vm.password = '';
  vm.confirmPassword = '';

  vm.loginMode = true;
  vm.toggleMode = toggleMode;
  vm.submitLogin = submitLogin;
  vm.submitSignUp = submitSignUp;

  function toggleMode() {
    vm.loginMode = !vm.loginMode;
  }

  function submitLogin() {
    console.log("Login button pressed.");
    console.log("Email: " + vm.email);
    console.log("Password: " + vm.password);

    // FIXME: This part of the code is not DRY.
    if (vm.email === undefined) {
      alert("Please enter your email.");
      return;
    }

    if (vm.password.length === 0) {
      alert("Please enter your password.");
      return;
    }

    // Complete POST request and redirect.
    var route = CURRENT_HOST + "/api/v1/login/";
    var loginJson = {
      email: vm.email,
      password: vm.password
    }

    // TODO: Replace with actual functionality.
    // $state.go("slider.chat");
    $state.go("slider");

    // $http.post(route, loginJson).
    //   success(function(data, status, headers, config) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     console.log("Logging in successful.");
    //     console.log(data.message);

    //     // Redirect to the chat page.
    //     $state.go("slider.chat");
    //   }).
    //   error(function(data, status, headers, config) {
    //     alert("Error logging in.");
    //     console.log("Error logging  in.");
    //   });
  }

  function submitSignUp() {
    // Validate all information.

    if (vm.name.length === 0) {
      alert("Please enter your name so we can start talking!");
      return;
    }

    if (vm.email.length === 0) {
      alert("Please enter your email.");
      return;
    }

    if (vm.password.length === 0) {
      alert("Please enter your password.");
      return;
    }

    if (vm.password !== vm.confirmPassword) {
      alert("Please make sure your password is correct.");
      return;
    }

    // Complete POST request and redirect.
    var route = CURRENT_HOST + "/api/v1/login/";
    var signUpJson = {
      name: vm.name,
      email: vm.email,
      password: vm.password
    }

    $http.post(route, signUpJson).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("Signing up successful.");
        console.log(data.message);

        // TODO: Redirect state to the chat page.

      }).
      error(function(data, status, headers, config) {
        alert("Error signing up.");
        console.log("Error signing up.");
      });
  }
}
