module.exports = function(app) {
  app.directive('prlInputSpace', [
    prlInputSpace
  ]);
};

function prlInputSpace() {
  return {
    restrict: 'EA',
    scope: {
      inputOptions: '='
    },
    templateUrl: "_templates/inputSpace.t.html",
    replace: true,
    controller: InputSpaceCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    link: InputSpaceLink
  };
}

InputSpaceCtrl.$inject = [];

function InputSpaceCtrl() {
  var vm = this;
  vm.enterUserInput = enterUserInput;

  function enterUserInput($index) {
    console.log("Entering the user input.");
    console.log("Input option index: " + $index);
    console.log("Input option: " + ChatServ.inputOptions[$index]);

    vm.currentInputMessage = ChatServ.inputOptions[$index].inputMessage;
    vm.currentInputID = ChatServ.inputOptions[$index].inputCardID;
    console.log(vm.currentInputMessage);

    // Now push user message into the history.
    // TODO: This is not DRY. Package and make DRY.
    ChatServ.chatMessages.push({
      speaker: "client",
      message: vm.currentInputMessage,
    });

    // Clear input options.
    vm.currentInputMessage = "";
    vm.inputOptions = [];
    console.log("inputOptions are cleared.");

    vm.requestNextCard({cardID: vm.currentInputID}, "addNextCard");
  }
}

function InputSpaceLink() {

}
