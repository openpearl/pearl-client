module.exports = function(app) {
  app.directive('prlChatScroll', [
    // '$http',
    // '$ionicPlatform',
    '$ionicScrollDelegate', 
    // '$cordovaHealthKit',
    PrlChatScroll
  ]);
}

function PrlChatScroll($ionicScrollDelegate) {
  return {
    restrict: 'A',
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
