module.exports = function(app) {
  app.controller('LoginSignUpController', [
    LoginSignUpController
  ]);
}

function LoginSignUpController() {
  var vm = this;

  vm.name;
  vm.email;
  vm.password;
  vm.confirmPassword;

  vm.loginMode = true;
  vm.toggleMode = toggleMode;
  vm.submitLogin = submitLogin;

  function toggleMode() {
    vm.loginMode = !vm.loginMode;
  }

  function submitLogin() {
    console.log("Login button pressed.");
    console.log(vm.email);
    console.log(vm.password);
  }
}
