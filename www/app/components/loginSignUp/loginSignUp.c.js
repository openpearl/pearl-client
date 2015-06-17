module.exports = function(app) {
  app.controller('LoginSignUpController', [
    LoginSignUpController
  ]);
}

function LoginSignUpController() {
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
    console.log(vm.email);
    console.log(vm.password);

    // FIXME: This part of the code is not DRY.
    if (vm.email.length === 0) {
      alert("Please enter your email.");
      return;
    }

    if (vm.password.length === 0) {
      alert("Please enter your password.");
      return;
    }

    // Complete POST request and redirect.
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
  }
}
