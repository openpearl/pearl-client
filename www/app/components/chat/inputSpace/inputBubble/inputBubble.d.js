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
      
    },
    templateUrl: "_templates/inputBubble.t.html",
    replace: true,
    controller: InputBubbleCtrl,
    controllerAs: "ctrl",
    bindToController: true,
    link: InputBubbleLink
  };
}

InputBubbleCtrl.$inject = ['$rootScope', 'ChatServ'];

function InputBubbleCtrl($rootScope, ChatServ) {

  // Data.
  vm.inputID = ""; // Holder for ID to reference later.
  vm.inputType = "";
  vm.inputMessage = "";

  // Methods.
  vm.enterUserInput = enterUserInput;

  // METHODS ******************************************************************

  function enterUserInput() {
    console.log("Entering the user input.");

    // Now push user message into the history.
    // TODO: This is not DRY. Package and make DRY.
    ChatServ.chatMessages.push({
      speaker: "client",
      message: vm.inputMessage
    });

    // Clear input options.
    ChatServ.inputOptions = {};
    console.log("inputOptions are cleared.");

    // Emit a call to request next card.
    $rootScope.$emit('chat:requestNextCard', {
      cardID: vm.inputID,
      inputMessage: vm.inputMessage
    });
  }
}

function InputBubbleLink() {

}
