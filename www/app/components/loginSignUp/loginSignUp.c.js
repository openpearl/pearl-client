module.exports = function(app) {
  app.controller('LoginSignUpController', [
    "$state",
    "submitLogin",
    "submitSignup",

    LoginSignUpController
  ]);
}

function LoginSignUpController($state, submitLogin, submitSignup) {
  var vm = this;

  vm.name = '';
  vm.email = '';
  vm.password = '';
  vm.confirmPassword = '';

  vm.loginMode = true;
  vm.toggleMode = toggleMode;
  vm.clickLogin = clickLogin;
  vm.clickSignup = clickSignup;

  vm.goToChat = goToChat;

  function toggleMode() {
    vm.loginMode = !vm.loginMode;
  }

  function clickLogin() {
    console.log("Login clicked.");
    submitLogin(vm.email, vm.password, vm.goToChat);
  }
  
  function clickSignup() {
    submitSignup(vm.name, vm.email, vm.password, 
      vm.confirmPassword, vm.goToChat);
  }

  function goToChat() {
    console.log("Going to chat.");
    $state.go("slider");
  }
}
