module.exports = function(app) {
  app.directive('prlInputBubble', [
    prlInputBubble
  ]);
};

// TODO: For future text inputs.
function prlInputBubble() {
  return {
    restrict: 'E',
    scope: {
      inputOption: '='
    },
    templateUrl: "_templates/inputBubble.t.html",
    replace: true,
    controller: InputBubbleCtrl,
    controllerAs: "inputBubbleCtrl",
    bindToController: true
  };
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
      vm.inputOption.message = vm.inputText;
      $rootScope.$emit('chat:continue', vm.inputOption);
    }
  }

  // HELPERS ******************************************************************
}
