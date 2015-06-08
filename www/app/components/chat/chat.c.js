module.exports = function(app) {
  app.controller('ChatController', [
    '$http',
    '$ionicPlatform',
    '$cordovaHealthKit', 
    ChatController
  ]);
}

function ChatController($http, $ionicPlatform, $cordovaHealthKit) {

  // TODO: Test this when Healthkit entitlement becomes possible.
  $ionicPlatform.ready(function() {
    console.log("Platform is ready here.");
    $cordovaHealthKit.isAvailable().then(
      function(yes) {
        var permissions = ['HKQuantityTypeIdentifierHeight'];
        console.log(permissions);      
        
        $cordovaHealthKit.requestAuthorization(
          permissions,
          permissions
        ).then(function(success){
          console.log("Requested permissions to read and write health information.");
        });
      },

      function(no) {

      });
  });

  var vm = this;

  vm.message = "";
  vm.sendInformation = sendInformation;
  vm.chatMessages = [];

  function sendInformation(){
    console.log(vm.message);

    // TODO: Add data to speech bubble.
    vm.chatMessages.push(vm.message);

    // TODO: Implement POST request.
    var url = "http://localhost:3000/test";
    var msg = vm.message;

    // $http.post(url, {msg:msg}).
    //   success(function(data, status, headers, config) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //   }).
    //   error(function(data, status, headers, config) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //   });

    vm.message = "";
  }
}
