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
  vm.LoginRegisterServ = LoginRegisterServ;

  // Methods.
  vm.goToSettings = goToSettings;
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

  // FIXME: Resume not functional and causing 10 digest runs.
  $ionicPlatform.on('resume', function() {
    vm.doRefresh();
  });

  $rootScope.$on('pearl:refresh', function() {
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

  function goToSettings() {
    console.log("Going to settings.");
    $ionicSlideBoxDelegate.slide(1);
  }

  function doRefresh() {
    console.log("Refreshing the conversation!");

    // TODO: This seems like a pretty bad way of doing things.
    // Refactor if possible.
    ChatServ.clearAll();

    UserContextServ.httpGetRequiredContext().then(
      function(response, status, headers, config) {
        $scope.$broadcast('scroll.refreshComplete');
        LoginRegisterServ.isLoggedIn = true;
        $ionicSlideBoxDelegate.update();
        console.log("doRefresh: httpGetRequiredContext.");
        console.log(response.data);
        // If logged in...
        UserContextServ.httpSendUserContext(response.data);
    }, function() {
      LoginRegisterServ.isLoggedIn = false;
      console.log("Not logged in yet.");

      // Not logged in yet.
      LoginRegisterServ.requestNextCard({cardID: "root"});
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
}
