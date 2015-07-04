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
  vm.testChange = testChange;


  function testChange() {
    console.log("Changed detected!");
  }

  console.log("Sup yo.");
}
