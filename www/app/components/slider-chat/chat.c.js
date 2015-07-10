module.exports = function(app) {
  app.controller('ChatCtrl', [
    '$scope',
    '$http',
    '$ionicScrollDelegate', 

    'ApiEndpoint',

    'ionicRequestPermissions',
    'getSteps',
    'sendClientContext',
    'requestNextComm',


    ChatCtrl
  ]);
}

function ChatCtrl(
    $scope,
    $http, 
    $ionicScrollDelegate,

    ApiEndpoint,

    // Custom services.
    ionicRequestPermissions,
    getSteps,
    sendClientContext,
    requestNextComm
  ) {

  var vm = this;

  vm.currentInputMessage = "";
  vm.currentInputID = ""; // Holder for ID to reference later.
  vm.chatMessages = []; // Messages displayed in the history.
  vm.inputOptions = []; // User input options.

  vm.enterClientInput = enterClientInput;
  vm.requestNextComm = requestNextComm;
  vm.addNextComm = addNextComm;

  vm.getRequiredContext = getRequiredContext;
  vm.requiredContext = {};

  // Request permissions and then refresh the page.
  ionicRequestPermissions(function() {
    vm.sendClientContext = sendClientContext;
    vm.doRefresh = doRefresh;
  });

  vm.getSteps = getSteps; // TODO: Why would I want to set this to the vm?

  // FIXME: Can this be 'vm'. If so, or if not, why?
  $scope.$on('$ionicView.enter', function() {
    console.log("I have entered the app.");

    // TODO: This is where you can send the context of the walking steps.
    // Check to see if logged in first.
    vm.doRefresh();
  });

  function doRefresh() {
    console.log("Refreshing the conversation!");

    vm.getRequiredContext(vm.sendClientContext);

    // vm.chatMessages = [];
    // vm.requestNextComm("root", vm.addNextComm);
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

  function enterClientInput($index) {
    console.log("Entering the client input.");
    console.log("Input option index: " + $index);
    console.log("Input option: " + vm.inputOptions[$index]);

    vm.currentInputMessage = vm.inputOptions[$index].inputMessage;
    vm.currentInputID = vm.inputOptions[$index].inputCommID;
    console.log(vm.currentInputMessage);

    // Now push client message into the history.
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

    vm.requestNextComm(vm.currentInputID, vm.addNextComm);
  }

  function addNextComm(responseData) {

    var currentCommID = responseData.commID;
    var currentSpeaker = responseData.speaker;
    var currentMessage = responseData.message;

    var nextCommID = responseData.childrenCards[0].cardId;
    var nextSpeaker = responseData.childrenCards[0].speaker;

    console.log("Returned commID: " + nextCommID);
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
      vm.requestNextComm(nextCommID);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");

      vm.inputOptions = [];

      // Push over the options.
      for (i in responseData.childrenCards) {
        vm.inputOptions.push({
          inputMessage: responseData.childrenCards[i].message,
          inputCommID: responseData.childrenCards[i].cardId
        });
      }
    }
  }
}
