module.exports = function(app) {
  app.controller('SettingsController', [
    '$state',
    '$ionicPlatform',
    '$http',
    SettingsController
  ]);
}

function SettingsController($state, $ionicPlatform, $http) {
  var vm = this;

  vm.searchText;
  vm.clientGoals;

  vm.clickLogout = clickLogout;
  vm.getClientGoals = getClientGoals;

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }

  function getClientGoals() {
    var url = '/api/v1/users/userID/goals';
    $http.get(url)
      .success(function(data) {
        vm.clientGoals = data;
      })
      .error(function(error) {
        console.log("Goal fetching unsuccessful.");
        console.log(error);
      });
  }
}
