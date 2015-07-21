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

ChatCtrl.$inject = ['$scope', '$rootScope', '$ionicPlatform',
  'UserContextServ', 'ChatServ', 'LoginRegisterServ'];

function ChatCtrl($scope, $rootScope, $ionicPlatform, UserContextServ, 
  ChatServ, LoginRegisterServ) {

  var vm = this;
  vm.doRefresh = function() {};
  
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

  $rootScope.$on('converse:ready', function() {
    console.log("converse:ready");
    ChatServ.requestNextCard({cardID: "root"});
  });

  // METHODS ******************************************************************

  function doRefresh() {
    console.log("Refreshing the conversation!");

    // TODO: This seems like a pretty bad way of doing things.
    // Refactor if possible.
    ChatServ.chatMessages = [];

    LoginRegisterServ.isLoggedIn().then(function() {
      console.log("Logged in.");

      // If logged in...
      UserContextServ.httpGetRequiredContext(
        UserContextServ.httpSendUserContext
      );
      ChatServ.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    
    }, function(error) {
      console.log("Not logged in yet.");

      // Not logged in yet.
      LoginRegisterServ.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
}
