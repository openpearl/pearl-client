module.exports = function(app) {app

  .directive('prlInputBubble', [
    prlInputBubble
  ])
  .controller('InputBubbleCtrl', [
    InputBubbleCtrl
  ])
  
;};

// TODO: For future text inputs.
function prlInputBubble() {
  return {
    restrict: 'E',
    scope: {
      
    },
    templateUrl: "_templates/chatInputSpace.t.html",
    replace: true,
    controller: "InputBubbleCtrl",
    controllerAs: "ctrl",
    bindToController: true,
    link: InputBubbleLink
  };
}

function InputBubbleCtrl() {

}

function InputBubbleLink() {

}
