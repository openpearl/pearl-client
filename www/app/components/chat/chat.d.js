module.exports = function(app) {
  
  app.directive('prlChat', [
    PrlChat
  ]);

  app.directive('prlChatMessages', [
    '$ionicScrollDelegate', 
    prlChatMessages
  ]);

};

function PrlChat() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '_templates/chat.t.html',
    replace: true,
    bindToController: true,
    controller: 'ChatCtrl',
    controllerAs: 'ctrl',
  };
}

function prlChatMessages($ionicScrollDelegate) {
  return {
    restrict: 'EA',
    scope: {
      val: '='
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue, oldValue) {
        if (newValue) {
          $ionicScrollDelegate.scrollBottom(true);
        }
      }, true);
    }
  };
}
