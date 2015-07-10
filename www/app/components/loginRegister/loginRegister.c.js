module.exports = function(app) {
  app.controller('LoginRegisterCtrl', [
    "$rootScope",
    "$state",
    "LoginRegisterServ",

    LoginRegisterCtrl
  ]);
}

function LoginRegisterCtrl($rootScope, $state, LoginRegisterServ) {
  var vm = this;

  vm.name = '';
  vm.email = '';
  vm.password = '';
  vm.confirmPassword = '';

  vm.loginMode = true;
  vm.toggleMode = toggleMode;

  vm.clickLogin = clickLogin;
  vm.clickSignup = clickSignup;

  // TODO: Figure out if this belongs here or somewhere else.
  $rootScope.$on('auth:login-success', function(ev, user) {
    $state.go('slider');
  });

  function toggleMode() {
    vm.loginMode = !vm.loginMode;
  }

  function clickLogin() {
    console.log("Login button clicked.");
    LoginRegisterServ.submitLogin(vm.email, vm.password);
  }
  
  function clickSignup() {
    console.log("Register button clicked.");
    LoginRegisterServ.submitRegister(vm.name, vm.email, vm.password, 
      vm.confirmPassword);    
  }
}
