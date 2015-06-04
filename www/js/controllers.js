angular.module('starter.controllers', [])
  .controller('PearlCtrl', PearlCtrl);

function PearlCtrl() {
  var vm = this;

  vm.sendInformation = sendInformation;

  function sendInformation(){
    console.log("I am being clicked!");
  }
}
