module.exports = function(app) {
  app.controller('ChatController', [
    '$http',
    '$ionicPlatform',
    '$ionicScrollDelegate', 
    '$cordovaHealthKit',
    ChatController
  ]);
}

function ChatController(
    $http, 
    $ionicPlatform, 
    $ionicScrollDelegate, 
    $cordovaHealthKit
  ) {

  // TODO: Test this when Healthkit entitlement becomes possible.
  $ionicPlatform.ready(function() {
    console.log("Platform is ready here.");
    $cordovaHealthKit.isAvailable().then(
      function(yes) {
        var readPermissions = ['HKQuantityTypeIdentifierStepCount'];
        var writePermissions = [];
        console.log(readPermissions);      
        
        $cordovaHealthKit.requestAuthorization(
          readPermissions,
          readPermissions
        ).then(function(success){
          console.log("Requested permissions to read and write health information.");
         });
      },

      function(no) {

      });
  });

  var vm = this;

  vm.getStepCount = getStepCount;

  vm.message = "";
  vm.sendInformation = sendInformation;
  vm.chatMessages = [];

  function getStepCount(){
    console.log("Getting step count.");

    var m = moment().startOf('day');  
    var endDate = m.toDate();  
    var startDate = moment(m).subtract('d', 1).toDate();  

    window.plugins.healthkit.sumQuantityType({
      'startDate': startDate,
      'endDate': endDate,
      'sampleType': 'HKQuantityTypeIdentifierStepCount'
    }, function(value) {
      console.log("HealthKit Step Count Success: " + value);
    }, function () {
      console.log("HealthKit Step Count Query unsuccessful.");
    });
  }

  function sendInformation(){
    vm.getStepCount();

    console.log(vm.message);

    // TODO: Add data to speech bubble.
    // TODO: Move this either to a factory or a service.
    vm.chatMessages.push(vm.message);
    $ionicScrollDelegate.scrollBottom(true);

    // TODO: Implement POST request.
    var url = "https://odmmjjialz.localtunnel.me/api/v1/tests/";
    var msg = vm.message;

    $http.post(url, {message: msg}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available

        console.log(data.message);
        vm.chatMessages.push(data.message);

      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.message = "";
  }
}
