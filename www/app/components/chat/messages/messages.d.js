module.exports = function(app) {app
  .directive('prlMessages', [
    '$ionicScrollDelegate', 
    prlMessages
  ])
;};

function prlMessages($ionicScrollDelegate) {
  return {
    restrict: 'EA',
    scope: {
      chatMessages: '='
    },
    templateUrl: "_templates/messages.t.html",
    replace: true,
    controller: MessagesCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    link: MessagesLink
  };
}

function MessagesCtrl() {
  vm = this;
}

function MessagesLink(scope, element, attrs) {
  scope.$watch('chatMessages', function(newValue, oldValue) {
    if (newValue) {
      $ionicScrollDelegate.scrollBottom(true);
    }
  }, true);
}
