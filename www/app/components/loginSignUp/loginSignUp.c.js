module.exports = function(app) {
  app.controller('LoginSignUpController', [
    LoginSignUpController
  ]);
}

function LoginSignUpController() {
  var vm = this;
  vm.email;
  vm.password;
  vm.submitLogin = submitLogin;

  function submitLogin() {
    console.log("Login button pressed.");
    console.log(vm.email);
    console.log(vm.password);
  }
}
