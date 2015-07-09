module.exports = function(app) {
  
  app.directive('prlSettings', [
    PrlSettings
  ]);

}

function PrlSettings() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'app/components/settings/settings.t.html',
    replace: true,
    bindToController: true,
    controller: 'SettingsController',
    controllerAs: 'ctrl',

    link: function(scope, element, attrs) {
      
    }
  };
}
