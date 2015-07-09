module.exports = function(app) {
  
  app.directive('prlLoginSignup', [
    prlLoginSignup
  ]);

}

function prlLoginSignup() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'app/components/loginSignUp/loginSignUp.t.html',
    replace: true,
    bindToController: true,
    controller: 'LoginSignUpController',
    controllerAs: 'ctrl',
  };
}
