module.exports = function(app) {app
  .directive('prlSlider', [
    prlSlider
  ])
;};

function prlSlider() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '_templates/slider.t.html',
    replace: true,
    bindToController: true,
    controller: SliderCtrl,
    controllerAs: 'sliderCtrl'
  };
}

SliderCtrl.$inject = ['ChatServ'];

function SliderCtrl(ChatServ) {
  var vm = this;
  vm.ChatServ = ChatServ;
}
