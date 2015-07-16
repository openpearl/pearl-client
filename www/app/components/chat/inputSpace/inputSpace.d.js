module.exports = function(app) {
  app.directive('prlInputSpace', [
    prlInputSpace
  ]);
};

function prlInputSpace() {
  return {
    restrict: 'EA',
    scope: {
      requestNextCard: '='
    },
    templateUrl: "_templates/inputSpace.t.html",
    replace: true,
    controller: InputSpaceCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    link: InputSpaceLink
  };
}

InputSpaceCtrl.$inject = ['ChatServ'];

function InputSpaceCtrl(ChatServ) {
  var vm = this;

}

function InputSpaceLink() {

}
