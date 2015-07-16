module.exports = function(app) {
  app.directive('prlChatInputSpace', [
    prlChatInputSpace
  ])
  .controller('ChatInputSpaceCtrl', [
    ChatInputSpaceCtrl
  ]);
};

// TODO: For future text inputs.
function prlChatInputSpace() {
  return {
    restrict: 'E',
    scope: {
      
    },
    templateUrl: "app/components/slider-chat/chatInputSpace.t.html",
    replace: true,
    controller: "ChatInputSpaceCtrl",
    controllerAs: "ctrl",
    bindToController: true,
    link: ChatInputSpaceLink
  };
}

function ChatInputSpaceCtrl() {

}

function ChatInputSpaceLink() {

}
