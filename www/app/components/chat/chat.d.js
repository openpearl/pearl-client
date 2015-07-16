module.exports = function(app) {
  app.directive('prlChat', [
    PrlChat
  ])
;};

function PrlChat() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '_templates/chat.t.html',
    replace: true,
    controller: ChatCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
  };
}

ChatCtrl.$inject = ['$scope', '$rootScope', 
  'UserContextServ', 'LoginRegisterServ', 'ChatServ'];

function ChatCtrl($scope, $rootScope, UserContextServ, 
  LoginRegisterServ, ChatServ) {

  var vm = this;
  vm.CS = ChatServ;

  vm.inputOptions = ChatServ.inputOptions; // User input options.
  vm.currentInputID = ""; // Holder for ID to reference later.
  vm.currentInputMessage = "";

  vm.currentService = ChatServ; // Stores which service should be accessed.
  vm.requestNextCard = requestNextCard;
  
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
      // If logged in...

      UserContextServ.httpGetRequiredContext(
        UserContextServ.httpSendUserContext
      );
      vm.requestNextCard({cardID: "root"}, vm.addNextCard);
      $scope.$broadcast('scroll.refreshComplete');
    
    }, function(error) {
      // Not logged in yet.
      vm.currentService = LoginRegisterServ;
      vm.requestNextCard({cardID: "root"}, "addNextCard");
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  // Toggles between which `requestNextCard` to execute.
  function requestNextCard(card, callback) {
    vm.currentService.requestNextCard(card, vm.currentService[callback]);
  }
}
