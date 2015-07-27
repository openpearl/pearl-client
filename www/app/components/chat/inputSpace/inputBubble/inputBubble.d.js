module.exports = function(app) {
  app.directive('prlInputBubble', [
    '$timeout',
    prlInputBubble
  ]);
};

// TODO: For future text inputs.
function prlInputBubble($timeout) {
  return {
    restrict: 'E',
    scope: {
      inputOption: '='
    },
    templateUrl: "_templates/inputBubble.t.html",
    replace: true,
    controller: InputBubbleCtrl,
    controllerAs: "inputBubbleCtrl",
    bindToController: true,
    link: InputBubbleLink
  };

  function InputBubbleLink(scope, element, attribute) {
    
    // It seems that the rendering of Angular elements take more time.
    // We must wait until everything has rendered before we can query 
    // for our input.
    // angular.element(document).ready(function () {
    // element[0].ready(function () {
    console.log("New bubble loaded.");
      // element[0].querySelector('input').focus();
    // element.on('load', function(event) {
    $timeout(function() {
      // console.log(element[0].querySelector('input'));
      // TODO: Focus not working. Potential race condition bug.
      console.log("About to focus.");
      var chosenElement = element[0].querySelector('input');
      console.log(chosenElement);
      chosenElement.blur();
      cordova.plugins.Keyboard.show();
      chosenElement.focus();
      chosenElement.select();
    });

    scope.$watch('focus', function(value) {
      if (value === 'true') {
        doFocus();
      }
    });
  }
}

InputBubbleCtrl.$inject = ['$rootScope'];

function InputBubbleCtrl($rootScope) {
  // FIXME: For some reason, I can't use `vm` in this situation.
  // RESOLVED: Apparent, I've accidentally set a globa `vm`.
  var vm = this;

  // Data.
  vm.inputText = "";

  // Methods.
  vm.submit = submit;   

  // METHODS ******************************************************************
  function submit() {
    console.log("Hitting submit.");
    if (vm.inputText !== "") {
      vm.inputOption.messages = vm.inputText;
      $rootScope.$emit('chat:continue', vm.inputOption);
    }
  }

  // HELPERS ******************************************************************
}
