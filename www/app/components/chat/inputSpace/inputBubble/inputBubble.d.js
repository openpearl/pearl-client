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

InputBubbleCtrl.$inject = ['$rootScope', 'ChatServ'];

function InputBubbleCtrl($rootScope, ChatServ) {
  // FIXME: For some reason, I can't use `vm` in this situation.
  // RESOLVED: Apparent, I've accidentally set a globa `vm`.
  var vm = this;

  // Data.

  // Methods.

  // METHODS ******************************************************************

  // HELPERS ******************************************************************
}
