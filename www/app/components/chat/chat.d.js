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

ChatCtrl.$inject = ['$scope', '$rootScope', '$ionicPlatform',
  'UserContextServ', 'LoginRegisterServ', 'ChatServ'];

function ChatCtrl($scope, $rootScope, $ionicPlatform, UserContextServ, 
  LoginRegisterServ, ChatServ) {

  var vm = this;

  vm.doRefresh = null;
  vm.currentService = ChatServ; // Stores which service should be accessed.
  vm.requestNextCard = requestNextCard;
  
  // Request permissions and then refresh the page.
  UserContextServ.localRequestPermissions(function() {
    vm.doRefresh = doRefresh;
    vm.doRefresh();
  });

  // $scope.$on('$ionicView.enter', function() {
  //   console.log("I have entered the app.");

  //   // TODO: This is where you can send the context of the walking steps.
  //   // Check to see if logged in first.
  //   vm.doRefresh();
  // });

  // https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
  $ionicPlatform.on('deviceready', function() {
    vm.doRefresh();
  });

  $ionicPlatform.on('resume', function() {
    vm.doRefresh();
  });

  $rootScope.$on('converse:ready', function() {
    console.log("converse:ready");
    vm.requestNextCard({cardID: "root"});
  });

  $rootScope.$on('chat:requestNextCard', function(event, card) {
    vm.requestNextCard(card);
  });

  // METHODS ******************************************************************

  function doRefresh() {
    console.log("Refreshing the conversation!");

    // TODO: This seems like a pretty bad way of doing things.
    // Refactor if possible.
    ChatServ.chatMessages = [];

    LoginRegisterServ.isLoggedIn().then(function() {
      // If logged in...

      UserContextServ.httpGetRequiredContext(
        UserContextServ.httpSendUserContext
      );
      vm.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    
    }, function(error) {
      // Not logged in yet.
      vm.currentService = LoginRegisterServ;
      vm.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  // Toggles between which `requestNextCard` to execute.
  function requestNextCard(card, callback) {
    var _callback = callback;
    if (_callback === undefined) {_callback = ChatServ.addNextCard;}
    vm.currentService.requestNextCard(card, _callback);
  }
}
