module.exports = function(app) {
  app.controller('SettingsCtrl', [
    '$state',
    '$ionicPlatform',
    'UserServ',
    'GoalsServ',
    SettingsCtrl
  ]);
}

function SettingsCtrl($state, $ionicPlatform, UserServ, GoalsServ) {

  var vm = this;

  vm.userID = UserServ.userID;
  vm.userGoals = GoalsServ.userGoals;

  vm.refresh = refresh;

  vm.searchText;
  vm.clickLogout = clickLogout;
  vm.clickGoal = clickGoal;

  vm.getUserGoals = GoalsServ.getUserGoals;

  $ionicPlatform.on('resume', function() {
    console.log("Resuming.");
    vm.getUserGoals();
  });

  function refresh() {
    vm.getUserGoals();    
  }

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }

  function clickGoal(goalID) {
    console.log("Goal clicked.");
    console.log(goalID);

    // Toggle the checked state of the goal.
    var goalCheck = !vm.userGoals[goalID].checked;
    GoalsServ.httpToggleGoal(goalID, goalCheck);
  }
}
