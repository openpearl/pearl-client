module.exports = function(app) {
  app.directive('prlSettings', [
    PrlSettings
  ]);
}

function PrlSettings() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'app/components/slider-settings/settings.t.html',
    replace: true,
    bindToController: true,
    controller: 'SettingsCtrl',
    controllerAs: 'ctrl',
    link: link
  };

  function link(scope, element, attrs) {

  }
}
