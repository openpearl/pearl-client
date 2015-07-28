module.exports = function(app) {
  app.directive('prlSettings', [
    PrlSettings
  ]);
};

function PrlSettings() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: '_templates/settings.t.html',
    replace: true,
    bindToController: true,
    controller: SettingsCtrl,
    controllerAs: 'ctrl',
    link: SettingsLink
  };

  function SettingsLink(scope, element, attrs) {
  }
}

SettingsCtrl.$inject = [
    '$http',
    '$state',
    '$window',
    '$ionicPlatform',
    'ApiEndpoint',
    'UserServ',
    'GoalsServ'];

function SettingsCtrl($http, $state, $window, $ionicPlatform, ApiEndpoint, UserServ, GoalsServ) {

  var vm = this;
  vm.GoalsServ = GoalsServ;

  vm.refresh = refresh;

  vm.clickLogout = clickLogout;
  vm.clickGoal = clickGoal;

  $ionicPlatform.on('resume', function() {
    console.log("Resuming.");
    GoalsServ.httpGetGoals();
  });

  function refresh() {
    GoalsServ.httpGetGoals();
  }

  function clickGoal(goalID) {
    console.log("Goal clicked.");
    console.log(goalID);

    // Toggle the checked state of the goal.
    var goalCheck = !GoalsServ.goals[goalID].checked;
    GoalsServ.httpToggleGoal(goalID, goalCheck);
  }

  function clickLogout() {
    UserServ.submitLogout(function() {
      // $state.go('slider');
      // $state.go('slider', {}, {reload: true});
      $window.location.reload(true);
    });
  }
}
