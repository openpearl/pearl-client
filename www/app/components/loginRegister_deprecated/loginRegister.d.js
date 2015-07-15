module.exports = function(app) {
  app.directive('prlLoginRegister', [
    prlLoginRegister
  ]);
};

function prlLoginRegister() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'app/components/loginRegister/loginRegister.t.html',
    replace: true,
    bindToController: true,
    controller: 'LoginRegisterCtrl',
    controllerAs: 'ctrl',
  };
}
