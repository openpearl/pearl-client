module.exports = function(app) {
  app.controller('SettingsController', [
    '$state',
    '$ionicPlatform',
    '$http',

    'UserModel',
    SettingsController
  ]);
}

function SettingsController($state, $ionicPlatform, $http, UserModel) {
  var vm = this;

  vm.userID = UserModel.userID;

  vm.searchText;
  vm.clientGoals;

  vm.clickLogout = clickLogout;
  vm.getClientGoals = getClientGoals;
  vm.setClientGoal = setClientGoal;

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }

  function getClientGoals() {
    var url = '/api/v1/users/'+ vm.userID + '/goals';
    $http.get(url)
      .success(function(data) {
        vm.clientGoals = data;
      })
      .error(function(error) {
        console.log("Goal fetching unsuccessful.");
        console.log(error);
      });
  }

  function setClientGoal(goalID) {
    var url = '/api/v1/users/' + vm.userID + '/goals/' + goalID;

    $http.put(url, vm.clientGoals[goalID])
      .success(function(data) {
        return true;
      })
      .error(function(error) {
        return error;
      });
  }
}
