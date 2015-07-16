module.exports = function(app) {app

  .directive('prlChat', [
    PrlChat
  ])

  .controller('ChatCtrl', [
    '$scope',
    '$rootScope',
    'UserContextServ',
    'LoginRegisterServ',
    'ChatServ',
    ChatCtrl
  ])

;};

function PrlChat() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '_templates/chat.t.html',
    replace: true,
    controller: 'ChatCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
  };
}

function ChatCtrl($scope, $rootScope, UserContextServ, LoginRegisterServ, ChatServ) {

  var vm = this;
  vm.CS = ChatServ;
  console.log('vm.CS.chatMessages');
  console.log(vm.CS.chatMessages);

  vm.inputOptions = ChatServ.inputOptions; // User input options.
  vm.currentInputID = ""; // Holder for ID to reference later.
  vm.currentInputMessage = "";

  vm.currentService = ChatServ; // Stores which service should be accessed.
  vm.requestNextCard = requestNextCard;
  
  vm.enterUserInput = enterUserInput;

  // Request permissions and then refresh the page.
  UserContextServ.localRequestPermissions(function() {
    vm.doRefresh = doRefresh;
  });

  // $scope.$on('$ionicView.enter', function() {
  //   console.log("I have entered the app.");

  //   // TODO: This is where you can send the context of the walking steps.
  //   // Check to see if logged in first.
  //   vm.doRefresh();
  // });

  $rootScope.$on('converse:ready', function() {
    console.log("converse:ready");
    vm.requestNextCard({cardID: "root"}, vm.addNextCard);
  });

  // METHODS ******************************************************************

  function doRefresh() {
    console.log("Refreshing the conversation!");

    // TODO: This seems like a pretty bad way of doing things.
    // Refactor if possible.
    ChatServ.chatMessages = [];
    LoginRegisterServ.chatMessages = [];

    vm.chatMessages = [];
    vm.inputOptions = [];

    LoginRegisterServ.isLoggedIn().then(function() {
      // Ping to server to see if I am still logged in or not.
      // If logged in, send conversation.
      // If not, trigger login.

      UserContextServ.httpGetRequiredContext(
        UserContextServ.httpSendUserContext
      );
      // vm.requestNextCard({cardID: "root"}, vm.addNextCard);
      $scope.$broadcast('scroll.refreshComplete');
    
    }, function(error) {
      // Not logged in yet. Let's start the login conversation.
      vm.currentService = LoginRegisterServ;

      // LoginRegisterServ.requestNextCard({cardID: "root"}, 
      //   LoginRegisterServ.addNextCard);
      vm.requestNextCard({cardID: "root"}, "addNextCard");
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  // Toggles between which `requestNextCard` to execute.
  function requestNextCard(card, callback) {
    vm.currentService.requestNextCard(card, vm.currentService[callback]);
  }

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