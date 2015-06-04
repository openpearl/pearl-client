angular.module('starter.controllers', [])
  .controller('PearlCtrl', PearlCtrl);

PearlCtrl.$inject = ["$http"];

function PearlCtrl($http) {
  var vm = this;

  vm.message = "";
  vm.sendInformation = sendInformation;

  function sendInformation(){
    console.log(vm.message);

    // TODO: Implement POST request.
    var url = "http://localhost:3000/test";
    var msg = vm.message;

    $http.post(url, {msg:msg}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.message = "";
  }
}
