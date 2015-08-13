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

ChatCtrl.$inject = ['$scope', '$rootScope', '$ionicPlatform', '$ionicSlideBoxDelegate', 'UserContextServ', 'ChatServ'];

function ChatCtrl($scope, $rootScope, $ionicPlatform, $ionicSlideBoxDelegate, UserContextServ, ChatServ) {

  var vm = this;
  vm.ChatServ = ChatServ;

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

  $ionicPlatform.on('pause', function() {
    ChatServ.setTimestamp();
  });

  $ionicPlatform.on('resume', function() {
    var timeDiff = ChatServ.getTimeDiff();
    console.log(timeDiff);

    // Only refresh the conversation if the resume is longer than delayMintues.
    var delayMinutes = 30;
    if (timeDiff >= delayMinutes * 60) {
      vm.doRefresh();
    }
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
    ChatServ.inputOptionToMessages(card);
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
        $ionicSlideBoxDelegate.update();
        console.log("doRefresh: httpGetRequiredContext.");
        console.log(response.data);
        
        // If logged in...
        ChatServ.isLoggedIn = true;
        UserContextServ.httpSendUserContext(response.data);
    }, function() {
      console.log("Not logged in yet.");

      // Not logged in yet.
      ChatServ.isLoggedIn = false;
      ChatServ.getGuestToken();
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
}
