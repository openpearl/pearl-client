module.exports = function(app) {
  app.controller('SettingsCtrl', [
    '$state',
    '$ionicPlatform',
    'UserModel',
    'ServerClientGoalService',
    SettingsCtrl
  ]);
}

function SettingsCtrl($state, $ionicPlatform, UserModel, 
  ServerClientGoalService) {

  var vm = this;

  vm.userID = UserModel.userID;
  vm.clientGoals = UserModel.clientGoals;

  vm.searchText;
  vm.clickLogout = clickLogout;
  vm.refresh = refresh;
  vm.clickGoal = clickGoal;

  vm.getClientGoals = ServerClientGoalService.getClientGoals;

  $ionicPlatform.on('resume', function() {
    console.log("Resuming.");
    vm.getClientGoals();
  });

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }

  function refresh() {
    vm.getClientGoals();    
  }

  function clickGoal(goalID) {
    console.log("Goal clicked.");
    console.log(goalID);

    // Toggle the checked state of the goal.
    var goalCheck = !vm.clientGoals[goalID].checked;

    ServerClientGoalService.toggleClientGoal(goalID, goalCheck);
  }
}
