module.exports = function(app) {
  app.controller('SliderController', [
    '$state',
    SliderController
  ]);
}

function SliderController($state) {
  
  var vm = this;

  vm.currentSlide;
  vm.slideHasChanged = slideHasChanged;

  console.log("I am in SliderControlller.");

  function slideHasChanged($index) {
    // console.log("Slide has changed.");

    // console.log("Index: ");
    // console.log($index);

    // FIXME: This is janky as hell.
    // Animations caused by this logic creates a huge black void in the middle.
    // switch ($index) {
    //   case 0:
    //     $state.go('slider.chat');
    //     break;
    //   case 1:
    //     $state.go('slider.settings');
    //     break;
    //   default:
    //     $state.go('slider.chat');
    // }

  }
}
