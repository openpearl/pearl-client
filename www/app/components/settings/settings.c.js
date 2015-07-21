module.exports = function(app) {
  app.controller('SettingsCtrl', [
    '$state',
    '$ionicPlatform',
    'UserServ',
    'GoalsServ',
    SettingsCtrl
  ]);
};

function SettingsCtrl($state, $ionicPlatform, UserServ, GoalsServ) {

  var vm = this;
  vm.GoalsServ = GoalsServ;

  vm.refresh = refresh;

  vm.clickLogout = clickLogout;
  vm.clickGoal = clickGoal;

  // vm.httpGetGoals = GoalsServ.httpGetGoals;

  $ionicPlatform.on('resume', function() {
    console.log("Resuming.");
    GoalsServ.httpGetGoals();
  });

  function refresh() {
    GoalsServ.httpGetGoals();
  }

  function clickLogout() {
    // TODO: Delete session.
    $state.go('login');
  }

  function clickGoal(goalID) {
    console.log("Goal clicked.");
    console.log(goalID);

    // Toggle the checked state of the goal.
    var goalCheck = !GoalsServ.goals[goalID].checked;
    GoalsServ.httpToggleGoal(goalID, goalCheck);
  }
}
