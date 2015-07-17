module.exports = function(app) {app
  .directive('prlMessages', [
    '$ionicScrollDelegate', 
    prlMessages
  ])
;};

function prlMessages($ionicScrollDelegate) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: "_templates/messages.t.html",
    replace: true,
    controller: MessagesCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    link: MessagesLink
  };
}

MessagesCtrl.$inject = ['ChatServ'];

function MessagesCtrl(ChatServ) {
  var vm = this;
  vm.CS = ChatServ;
}

function MessagesLink(scope, element, attrs) {
  scope.$watch('chatMessages', function(newValue, oldValue) {
    if (newValue) {
      $ionicScrollDelegate.scrollBottom(true);
    }
  }, true);
}
