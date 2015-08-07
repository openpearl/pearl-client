module.exports = function(app) {app
  .directive('prlMessages', [
    '$timeout',
    '$ionicScrollDelegate', 
    prlMessages
  ])
;};

function prlMessages($timeout, $ionicScrollDelegate) {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: "_templates/messages.t.html",
    replace: true,
    controller: MessagesCtrl,
    controllerAs: 'messagesCtrl',
    bindToController: true,
    link: MessagesLink
  };

  function MessagesLink(scope, element, attrs) {
    
    scope.$watch('messagesCtrl.CS.chatMessages', function(newValue, oldValue) {
      if (newValue) {
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('messagesScroll')
            .scrollBottom(true);
        }, 200);
      }
    }, true);
  }
}

MessagesCtrl.$inject = ['$http', '$scope', 'ChatServ'];

function MessagesCtrl($http, $scope, ChatServ) {
  var vm = this;
  vm.CS = ChatServ;
  vm.checkLoading = checkLoading;

  vm.stillLoading = false;


  function checkLoading() {
    return $http.pendingRequests.length > 0;
  }

  $scope.$watch(vm.checkLoading, function(v) {
    if (v) {
      vm.stillLoading = true;
    } else {
      vm.stillLoading = false;
    }
  });

}
