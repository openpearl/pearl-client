module.exports = function(app) {
  app.controller('ChatController', [
    '$scope',
    '$q',
    '$http',
    '$ionicPlatform',
    '$ionicScrollDelegate', 
    // '$ionicView',
    '$cordovaHealthKit',
    ChatController
  ]);
}

function ChatController(
    $scope,
    $q,
    $http, 
    $ionicPlatform, 
    $ionicScrollDelegate, 
    // $ionicView,
    $cordovaHealthKit
  ) {

  var vm = this;

  vm.currentInputMessage = "";
  vm.currentInputID = "";

  vm.chatMessages = [];

  // TODO: Change this to correspond to what the server returns.
  vm.inputOptions = [];

  vm.enterClientInput = enterClientInput;
  vm.requestNextComm = requestNextComm;

  vm.handleSuccessComm = handleSuccessComm;
  vm.handleErrorComm = handleErrorComm;

  vm.getSteps = getSteps;

  // TODO: Test this when Healthkit entitlement becomes possible.
  $ionicPlatform.ready(function() {
    console.log("Platform is ready here.");
    $cordovaHealthKit.isAvailable().then(
      function(yes) {

        vm.sendClientContext = sendClientContext;
        vm.doRefresh = doRefresh;
        
        var readPermissions = [
          'HKQuantityTypeIdentifierDistanceWalkingRunning',
          'HKQuantityTypeIdentifierDistanceCycling',
          'HKQuantityTypeIdentifierStepCount',
        ];

        var writePermissions = [];
        console.log(readPermissions);      
        
        $cordovaHealthKit.requestAuthorization(
          readPermissions,
          writePermissions
        ).then(function(success){
          console.log("Requested permissions to read and write health information.");
         });
      },
      function(no) {});
  });

  // FIXME: Can this be 'vm'. If so, or if not, why?
  $scope.$on('$ionicView.enter', function() {
    console.log("I have entered the app.");
    // TODO: This is where you can send the context of the walking steps.
    vm.doRefresh();
  });

  function doRefresh() {
    console.log("Refreshing the conversation!");
    vm.sendClientContext();
    vm.chatMessages = [];
    vm.requestNextComm("root");
    $scope.$broadcast('scroll.refreshComplete');
  }

  function getSteps(startDate, endDate) {
    console.log("Getting step count.");

    return $q(function (resolve, reject) {
      window.plugins.healthkit.sumQuantityType({
        'startDate': startDate,
        'endDate': endDate,
        'distanceUnit': 'mileUnit',
        'sampleType': 'HKQuantityTypeIdentifierStepCount'
      }, function(steps) {
        console.log("HealthKit Step Count Success: " + steps + " steps.");
        resolve(steps);
      }, function () {
        console.log("HealthKit Step Count Query unsuccessful.");
        reject();
      });
    });
  }

  function sendClientContext() {
    console.log("I am now going to send client context."); 

    var m = moment().startOf('day');  
    var startDate = m.toDate();  
    var endDate = moment(m).add(1, 'd').toDate(); 
    
    console.log(startDate);
    console.log(endDate);

    vm.getSteps(startDate, endDate)
      .then(function(steps) {
        // TODO: Change this to the correct route.
        var route = CURRENT_HOST + "/api/v1/documents/2";
        var clientContext = { 
          "document": {
            // TODO: Change user_id.
            userID: 1,
            steps: steps
          }
        }

        $http.patch(route, clientContext).
          success(function(data, status, headers, config) {
            console.log(data.message);

            // TODO: Populate messages with the next message.
            // Call method to populate messages and commands.

          }).
          error(function(data, status, headers, config) {
            alert("An error happened sending the message.");
          });
      }, function() {
        console.log("Error in getSteps promise.");
      }); 
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

    vm.requestNextComm(vm.currentInputID);
  }

  function requestNextComm(nextCommID) {
    var route = "/api/v1/communications"
    console.log(route);
    var commRequest = {
      commID: nextCommID
    };

    $http.post(route, commRequest).
      success(vm.handleSuccessComm).
      error(vm.handleErrorComm);
  }

  function handleSuccessComm(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("Conversation started!");
    console.log(data);

    // When we reach the last message, terminate the conversation.
    if (data === null) {
      console.log("Data is null.");
      return;
    }

    var currentCommID = data.commID;
    var currentSpeaker = data.speaker;
    var currentMessage = data.message;

    var nextCommID = data.childrenCards[0].cardId;
    var nextSpeaker = data.childrenCards[0].speaker;

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
      for (i in data.childrenCards) {
        vm.inputOptions.push({
          inputMessage: data.childrenCards[i].message,
          inputCommID: data.childrenCards[i].cardId
        });
      }
    }
  }

  function handleErrorComm(data, status, headers, config) {
    console.log(data);
    alert("Conversation start unsuccessful.");
  }
}
