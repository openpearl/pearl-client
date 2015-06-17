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
}
