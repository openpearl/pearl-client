module.exports = function(app) {
  
  app.directive('prlChat', [
    PrlChat
  ]);

  app.directive('prlChatScroll', [
    '$ionicScrollDelegate', 
    PrlChatScroll
  ]);

  app.directive('prlChatInputSpace', [
    PrlChatInputSpace
  ]);

}

function PrlChat() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/slider-chat/chat.t.html',
    replace: true,
    bindToController: true,
    controller: 'ChatCtrl',
    controllerAs: 'ctrl',
  };
}

function PrlChatScroll($ionicScrollDelegate) {
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
  }
}

// TODO: For future text inputs.
function PrlChatInputSpace() {
  return {
    restrict: 'E'
  }
}
