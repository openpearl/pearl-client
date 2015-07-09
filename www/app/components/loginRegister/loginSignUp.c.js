module.exports = function(app) {
  app.controller('LoginSignUpController', [
    "$rootScope",
    "$state",
    "submitLogin",
    "submitSignup",

    LoginSignUpController
  ]);
}

function LoginSignUpController($rootScope, $state, submitLogin, submitSignup) {
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


  $rootScope.$on('auth:login-success', function(ev, user) {
    // alert("Welcome ", user.email);
    $state.go('slider');
  });

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
