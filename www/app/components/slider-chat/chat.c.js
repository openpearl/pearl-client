module.exports = function(app) {
  app.controller('ChatCtrl', [
    '$scope',
    '$rootScope',
    'UserContextServ',
    'ChatServ',
    ChatCtrl
  ]);
}

function ChatCtrl($scope, $rootScope, UserContextServ, ChatServ) {

  var vm = this;

  // Chat storage.
  vm.ChatServ = ChatServ;

  vm.inputOptions = []; // User input options.
  vm.currentInputID = ""; // Holder for ID to reference later.
  vm.currentInputMessage = "";

  vm.enterUserInput = enterUserInput;
  vm.addNextCard = addNextCard;

  // Request permissions and then refresh the page.
  UserContextServ.localRequestPermissions(function() {
    vm.doRefresh = doRefresh;
  });

  $scope.$on('$ionicView.enter', function() {
    console.log("I have entered the app.");

    // TODO: This is where you can send the context of the walking steps.
    // Check to see if logged in first.
    vm.doRefresh();
  });

  $rootScope.$on('converse:ready', function() {
    ChatServ.httpRequestNextCard("root", vm.addNextCard);
  });

  // METHODS ********************

  function doRefresh() {
    console.log("Refreshing the conversation!");
    UserContextServ.httpGetRequiredContext(
      UserContextServ.httpSendUserContext
    );
    // TODO: What do I want after getting the required context?

    // TODO: Refactor this to be somewhere else.
    // ChatServ.httpRequestNextCard("root", vm.addNextCard);
    ChatServ.chatMessages = [];
    vm.inputOptions = [];

    $scope.$broadcast('scroll.refreshComplete');
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
    ChatServ.chatMessages.push({
      speaker: "client",
      message: vm.currentInputMessage,
    });

    // Clear input options.
    vm.currentInputMessage = "";
    vm.inputOptions = [];
    console.log("inputOptions are cleared.");
    console.log(vm.inputOptions);

    ChatServ.httpRequestNextCard(vm.currentInputID, vm.addNextCard);
  }

  function addNextCard(responseData) {

    console.log(ChatServ.chatMessages);

    console.log("addNextCard");
    console.log(responseData);

    var currentCardID = responseData.cardID;
    var currentSpeaker = responseData.speaker;
    var currentMessage = responseData.messages;

    var choice = Math.random();
    choice = Math.floor(choice * responseData.childrenCardIDs.length);
    console.log(choice);

    var nextCardID = responseData.childrenCardIDs[choice];
    var nextSpeaker = responseData.childrenCards[choice].speaker;

    console.log("Returned cardID: " + nextCardID);
    console.log("Returned speaker: " + nextSpeaker);

    // Push the mssage of the card.
    if (currentSpeaker === "ai") {
      ChatServ.chatMessages.push({
        speaker: currentSpeaker,
        message: currentMessage,
      });
    }

    // Do another request if the next speaker is also an AI.
    if (nextSpeaker === "ai") {
      ChatServ.httpRequestNextCard(nextCardID, vm.addNextCard);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");
      vm.inputOptions = [];

      // Push over the options.
      for (i in responseData.childrenCards) {
        vm.inputOptions.push({
          inputMessage: responseData.childrenCards[i].messages,
          inputCardID: responseData.childrenCards[i].cardID
        });

        console.log("vm.inputOptions: ");
        console.log(vm.inputOptions);
      }
    }
  }
}
