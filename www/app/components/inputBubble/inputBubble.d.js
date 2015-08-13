module.exports = function(app) {
  app.directive('prlInputBubble', [
    '$timeout',
    prlInputBubble
  ]);
};

// TODO: For future text inputs.
function prlInputBubble($timeout) {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    template: '<div ng-include class="include-wrapper" src="template"></div>',
    // templateUrl: "_templates/inputBubble.t.html",
    replace: true,
    controller: InputBubbleCtrl,
    controllerAs: "inputBubbleCtrl",
    bindToController: true,
    link: InputBubbleLink
  };

  function InputBubbleLink(scope, element, attribute) {
    
    scope.template = "_templates/inputBubble-" + 
      scope.inputBubbleType + ".t.html";

    // It seems that the rendering of Angular elements take more time.
    // We must wait until everything has rendered before we can query 
    // for our input.
    // console.log("New bubble loaded.");
    if (scope.inputBubbleType === 'simple') {
      $timeout(function() {
        console.log("About to focus.");
        // var chosenElement = element[0].querySelector('input');
        var chosenElement = $('.prl-input-bubble')[0].children[0];
        chosenElement.focus();
      }, 100);
    }
  }
}

InputBubbleCtrl.$inject = ['$scope', '$rootScope'];

function InputBubbleCtrl($scope, $rootScope) {
  var vm = this;

  // Data.
  vm.inputText = "";

  // Methods.
  vm.submit = submit;

  // Initialization.
  chooseInput();

  // METHODS ******************************************************************
  
  function submit(ev) {
    console.log("Hitting submit.");

    if ($scope.inputBubbleType === 'simple') {

      // Catch any blank submissions.
      if (vm.inputText === "" || vm.inputText === undefined) {
        ev.preventDefault();
        shakeForm();
        return;
      }

      if (vm.inputText !== "") {
        // Create the cardBody and supply with proper key 
        // for the supplied data.
        vm.card.cardBody = {};
        vm.card.cardBody[vm.card.inputs[0]] = vm.inputText;
      }
    }

    $rootScope.$emit('chat:continue', vm.card);
  }

  // HELPERS ******************************************************************
  
  function chooseInput() {
    var cardType = vm.card.cardType;
    var simpleCardTypes = ['text', 'email', 'password'];

    $scope.inputBubbleType = 'choice';
    if (simpleCardTypes.indexOf(cardType) > -1) {
      $scope.inputBubbleType = "simple";
    }
  }

  // TODO: Does this belong in the post-link?
  function shakeForm() {
    var l = 20;  
    for( var i = 0; i < 10; i++ ) {
      $(".prl-input-bubble").animate( { 
        'margin-left': "+=" + ( l = -l ) + 'px' 
      }, 50);
    }
  }
}
