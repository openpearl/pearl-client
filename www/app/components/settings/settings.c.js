module.exports = function(app) {
  app.controller('SettingsController', [
    '$state',
    '$ionicPlatform',
    'UserModel',
    SettingsController
  ]);
}

function SettingsController($state, $ionicPlatform, UserModel) {
  var vm = this;

  vm.userID = UserModel.userID;
  vm.clientGoals = UserModel.clientGoals;

  vm.searchText;
  vm.clickLogout = clickLogout;

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }
}
