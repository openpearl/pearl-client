module.exports = function(app) {
  app.directive('prlLoginSignUpButton', [
    PrlLoginSignUpButton
  ]);

}

function PrlLoginSignUpButton() {
  return {
    restrict: 'E',
    scope: {
      val: '='
    },
    replace: true,
    templateUrl: 'app/components/loginSignUp/loginSignUpButtons.t.html',
    link: function(scope, element, attrs) {

    }
  }
}
