module.exports = function(app) {
  app.directive('prlSettings', [
    PrlSettings
  ]);
};

function PrlSettings() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'app/components/settings/settings.t.html',
    replace: true,
    bindToController: true,
    controller: SettingsCtrl,
    controllerAs: 'ctrl',
    link: link
  };

  function link(scope, element, attrs) {

  }
}

SettingsCtrl.$inject = [
    '$state',
    '$ionicPlatform',
    'UserServ',
    'GoalsServ'];

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
    $state.go('slider');
  }

  function clickGoal(goalID) {
    console.log("Goal clicked.");
    console.log(goalID);

    // Toggle the checked state of the goal.
    var goalCheck = !GoalsServ.goals[goalID].checked;
    GoalsServ.httpToggleGoal(goalID, goalCheck);
  }
}
