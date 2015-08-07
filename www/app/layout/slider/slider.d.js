module.exports = function(app) {app

  .directive('prlSlider', [
    prlSlider
  ])

  .controller('SliderCtrl', [
    SliderCtrl
  ])

;};

function prlSlider() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/layout/slider/slider.t.html',
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
