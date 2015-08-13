module.exports = function(app) {
  app.directive('prlSettings', [
    PrlSettings
  ]);
};

function PrlSettings() {
  return {
    restrict: 'EA',
    // scope: {},
    scope: true,
    templateUrl: '_templates/settings.t.html',
    replace: true,
    bindToController: true,
    controller: SettingsCtrl,
    controllerAs: 'settingsCtrl',
    link: SettingsLink
  };

  function SettingsLink(scope, element, attrs) {
  }
}

SettingsCtrl.$inject = [
    '$http',
    '$state',
    '$window',
    '$timeout',
    '$ionicPlatform',
    'ApiEndpoint',
    'UserServ',
    'UserContextServ',
    'GoalsServ'];

function SettingsCtrl($http, $state, $window, $timeout, $ionicPlatform, ApiEndpoint, UserServ, UserContextServ, GoalsServ) {

  var vm = this;
  vm.GoalsServ = GoalsServ;

  vm.canScroll = false;

  vm.refresh = refresh;
  vm.toggleGoals = toggleGoals;
  vm.clickGoal = clickGoal;
  vm.clickLogout = clickLogout;

  $ionicPlatform.on('deviceready', function() {
    vm.refresh();
  });

  $ionicPlatform.on('resume', function() {
    console.log("Resuming.");
    vm.refresh();
  });

  function refresh() {
    GoalsServ.httpGetGoals();
    // UserContextServ.getStepCountGraphData();
  }

  function toggleGoals(goalCategory) {
    console.log("Toggling goals.");
    console.log(goalCategory);

    if (goalCategory.isExpanded === undefined) {
      goalCategory.isExpanded = false;
    }

    goalCategory.isExpanded = !goalCategory.isExpanded;
  }

  function clickGoal(_goal) {
    var goal = _goal;

    console.log("Goal clicked.");

    // Toggle the checked state of the goal.
    goal.checked = !goal.checked;

    GoalsServ.httpToggleGoal(goal);
  }

  function clickLogout() {
    UserServ.submitLogout(function() {
      // $state.go('slider');
      // $state.go('slider', {}, {reload: true});
      $window.location.reload(true);
    });
  }
}
