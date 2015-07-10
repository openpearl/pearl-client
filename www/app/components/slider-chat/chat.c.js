module.exports = function(app) {
  app.controller('ChatCtrl', [
    '$scope',
    'UserContextServ',
    'ChatServ',
    ChatCtrl
  ]);
}

function ChatCtrl($scope, UserContextServ, ChatServ) {

  var vm = this;

  // Chat storage.
  vm.chatMessages = []; // Messages displayed in the history.
  vm.inputOptions = []; // User input options.
  vm.currentInputID = ""; // Holder for ID to reference later.
  vm.currentInputMessage = "";

  vm.enterUserInput = enterUserInput;
  vm.requestNextCard = requestNextCard;
  vm.addNextCard = addNextCard;

  vm.getRequiredContext = getRequiredContext;
  vm.requiredContext = {};

  // Request permissions and then refresh the page.
  UserContextServ.localRequestPermissions(function() {
    vm.sendUserContext = sendUserContext;
    vm.doRefresh = doRefresh;
  });

  // FIXME: Can this be 'vm'. If so, or if not, why?
  $scope.$on('$ionicView.enter', function() {
    console.log("I have entered the app.");

    // TODO: This is where you can send the context of the walking steps.
    // Check to see if logged in first.
    vm.doRefresh();
  });

  function doRefresh() {
    console.log("Refreshing the conversation!");

    vm.getRequiredContext(vm.sendUserContext);

    // vm.chatMessages = [];
    // vm.requestNextCard("root", vm.addNextCard);
    $scope.$broadcast('scroll.refreshComplete');
  }

  function getRequiredContext(callback) {
    var url = ApiEndpoint.url + "/pearl/context";
    $http.get(url)
      .success(function(data, status, headers, config) {
        console.log("Successfully received contexts.");
        vm.requiredContext = data;
        console.log(vm.requiredContext);
        callback();
      })
      .error();
  }

  function enterUserInput($index) {
    console.log("Entering the user input.");
    console.log("Input option index: " + $index);
    console.log("Input option: " + vm.inputOptions[$index]);

    vm.currentInputMessage = vm.inputOptions[$index].inputMessage;
    vm.currentInputID = vm.inputOptions[$index].inputCardID;
    console.log(vm.currentInputMessage);

    // Now push user message into the history.
    // TODO: This is not DRY. Package and make DRY.
    vm.chatMessages.push({
      speaker: "client",
      message: vm.currentInputMessage,
    });

    // Clear input options.
    vm.currentInputMessage = "";
    vm.inputOptions = [];
    console.log("Input options are cleared?");
    console.log(vm.inputOptions);

    vm.requestNextCard(vm.currentInputID, vm.addNextCard);
  }

  function addNextCard(responseData) {

    var currentCardID = responseData.cardID;
    var currentSpeaker = responseData.speaker;
    var currentMessage = responseData.message;

    var nextCardID = responseData.childrenCards[0].cardId;
    var nextSpeaker = responseData.childrenCards[0].speaker;

    console.log("Returned cardID: " + nextCardID);
    console.log("Returned speaker: " + nextSpeaker);

    // Push the mssage of the card.
    if (currentSpeaker === "ai") {
      vm.chatMessages.push({
        speaker: currentSpeaker,
        message: currentMessage,
      });
    }

    // Do another request if the next speaker is also an AI.
    if (nextSpeaker === "ai") {
      vm.requestNextCard(nextCardID);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");

      vm.inputOptions = [];

      // Push over the options.
      for (i in responseData.childrenCards) {
        vm.inputOptions.push({
          inputMessage: responseData.childrenCards[i].message,
          inputCardID: responseData.childrenCards[i].cardId
        });
      }
    }
  }
}
