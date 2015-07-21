module.exports = function(app) {
  app.directive('prlChoiceBubble', [
    prlChoiceBubble
  ]);
};

function prlChoiceBubble() {
  return {
    restrict: 'E',
    scope: {
      inputOption: '='
    },
    templateUrl: "_templates/inputBubble.t.html",
    replace: true,
    controller: ChoiceBubbleCtrl,
    controllerAs: "choiceBubbleCtrl",
    bindToController: true
  };
}

ChoiceBubbleCtrl.$inject = ['$rootScope', 'ChatServ'];

function ChoiceBubbleCtrl($rootScope, ChatServ) {
  var vm = this;

  console.log(vm.inputOption);

  // Data.

  // Methods.
  vm.enterChoiceInput = enterChoiceInput;

  // METHODS ******************************************************************

  
  // HELPERS ******************************************************************
}
