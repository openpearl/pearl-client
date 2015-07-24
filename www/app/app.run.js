module.exports = function(app) {
  app.run(appRun); 
};

function appRun($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory 
    // bar above the keyboard for form inputs)
    if (window.cordova && 
      window.cordova.plugins && 
      window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Choose your statusbar styling here.
    // $cordovaStatusbar.style(2);
    $cordovaStatusbar.hide();
  });
}
