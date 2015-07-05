module.exports = function(app) {
  app.controller('SettingsController', [
    '$http',
    '$ionicPlatform',
    '$ionicScrollDelegate', 
    '$cordovaHealthKit',
    SettingsController
  ]);
}

function SettingsController() {
  var vm = this;

  vm.enableFriends;
  vm.testChange;
  vm.testMessage = "Hello world!";
  vm.testClick = testClick;

  function testClick() {
    console.log("swagswag");
  }



  console.log("Sup syo.");
}
