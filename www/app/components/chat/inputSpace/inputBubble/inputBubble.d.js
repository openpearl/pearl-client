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
    bindToController: true,
    link: InputBubbleLink
  };
}

InputBubbleCtrl.$inject = ['$rootScope', 'ChatServ'];

function InputBubbleCtrl($rootScope, ChatServ) {
  // FIXME: For some reason, I can't use `vm` in this situation.
  // RESOLVED: Apparent, I've accidentally set a globa `vm`.
  var vm = this;

  // Data.
  vm.inputType = "";
  vm.inputMessage = "";

  // Methods.
  vm.determineInput = determineInput;

  // METHODS ******************************************************************

  function determineInput() {
    console.log("Determining the input.");

    switch(vm.inputOption.inputType) {
      
      case "choice":
        enterChoiceInput();
        break;

      case "email":
        console.log("It's an email!");
        enterEmailInput();
        break;

      default:
        enterChoiceInput();
    }
  }

  // HELPERS ******************************************************************

  function enterChoiceInput() {
    ChatServ.chatMessages.push({
      speaker: "client",
      message: vm.inputOption.inputMessage
    });

    clearInputs();
    
    // Emit a call to request next card.
    $rootScope.$emit('chat:requestNextCard', {
      cardID: vm.inputOption.cardID,
      inputMessage: vm.inputOption.inputMessage
    });
  }

  function enterEmailInput() {
    console.log("Entering email.");
  }

  function clearInputs() {
    // Clear input options.
    ChatServ.inputOptions = {};
    console.log("inputOptions are cleared.");
  }
}

function InputBubbleLink(scope, element, attrs) {
  element.on('click', function() {
    console.log("Clicked!");
    console.log(scope);   
    console.log(element);
  });

  // HELPERS ******************************************************************
}
