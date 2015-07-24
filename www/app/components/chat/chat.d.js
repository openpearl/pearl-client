module.exports = function(app) {
  app.directive('prlChat', [
    PrlChat
  ]);
};

function PrlChat() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: '_templates/chat.t.html',
    replace: true,
    controller: ChatCtrl,
    controllerAs: 'chatCtrl',
    bindToController: true
  };
}

ChatCtrl.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$ionicSlideBoxDelegate', 'UserContextServ', 'ChatServ', 'LoginRegisterServ'];

function ChatCtrl($scope, $rootScope, $ionicPlatform, $ionicSlideBoxDelegate, UserContextServ, ChatServ, LoginRegisterServ) {

  var vm = this;

  // Methods.
  vm.doRefresh = function() {};
  
  // INITIAL RUN **************************************************************

  // Request permissions and then refresh the page.
  UserContextServ.localRequestPermissions(function() {
    vm.doRefresh = doRefresh;
    vm.doRefresh();
  });

  // EVENT LISTENERS **********************************************************

  // https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
  $ionicPlatform.on('deviceready', function() {
    vm.doRefresh();
  });

  $ionicPlatform.on('resume', function() {
    vm.doRefresh();
  });

  $rootScope.$on('refresh', function() {
    vm.doRefresh();
  });

  $rootScope.$on('converse:ready', function() {
    console.log("converse:ready");
    ChatServ.requestNextCard({cardID: "root"});
  });

  // Continue the conversation through the chat directive.
  // TODO: I'm not too happy about this method.
  // Needs better implementation.
  $rootScope.$on('chat:continue', function(event, card) {
    if (LoginRegisterServ.isLoggedIn === false) { 
      LoginRegisterServ.inputOptionToMessages(card); 
    } else { ChatServ.inputOptionToMessages(card); }
  });

  // METHODS ******************************************************************

  function doRefresh() {
    console.log("Refreshing the conversation!");

    // TODO: This seems like a pretty bad way of doing things.
    // Refactor if possible.
    ChatServ.chatMessages = [];

    UserContextServ.httpGetRequiredContext().then(
      function(data, status, headers, config) {
        $scope.$broadcast('scroll.refreshComplete');
        LoginRegisterServ.isLoggedIn = true;
        $ionicSlideBoxDelegate.update();
        console.log("Logged in.");
        console.log(data);
  
        // If logged in...
        UserContextServ.httpSendUserContext();
    }, function() {
      LoginRegisterServ.isLoggedIn = false;
      console.log("Not logged in yet.");

      // Not logged in yet.
      LoginRegisterServ.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
}
