module.exports = function(app) {
  
  app.directive('prlChatScroll', [
    '$ionicScrollDelegate', 
    PrlChatScroll
  ]);

  app.directive('prlChatInputSpace', [
    PrlChatInputSpace
  ]);

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

function PrlChatInputSpace() {
  return {
    restrict: 'E'
  }
}
