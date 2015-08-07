module.exports = function(app) {app
  .directive('prlChatBubble', [
    prlChatBubble
  ])
;};

function prlChatBubble() {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    template: '<ng-include src="template"/>',
    // templateUrl: "_templates/chatBubble.t.html",
    replace: true,
    controller: ChatBubbleCtrl,
    controllerAs: 'chatBubbleCtrl',
    bindToController: true,
    link: ChatBubbleLink
  };

  function ChatBubbleLink(scope, element, attrs) {
    scope.template = "_templates/chatBubble-" + 
      scope.chatBubbleType + ".t.html";
  }
}

ChatBubbleCtrl.$inject = ['$scope'];

function ChatBubbleCtrl($scope) {
  vm = this;

  // TODO: Temporary. This needs to change to handle graphs.
  handleText();
  $scope.chatBubbleType = "text";

  // If no cardType present, render as text.
  if (!vm.card.cardType) {
    // $scope.chatBubbleType = "text";
  
  } else if (vm.card.cardType) {

    // Render password as stars.
    if (vm.card.cardType === "password") {
      $scope.chatBubbleType = "password";
    }
  }

  // HELPERS ******************************************************************
  function handleText() {
    for (var attr in vm.card.cardBody) {

      if (vm.card.cardBody[attr].constructor === Array) {
        vm.card.cardBody.text = vm.card.cardBody[attr][0];       
      } else {
        vm.card.cardBody.text = vm.card.cardBody[attr];       
      }

    }
  }
}
