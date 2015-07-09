var appCore = require('./core/core.m.js');
var sharedUser = require('./shared/user/user.m.js');
var sharedSlider = require('./shared/slider/slider.m.js');

var componentsLoginSignUp 
  = require('./components/loginSignUp/loginSignUp.m.js');
var componentsChat = require('./components/chat/chat.m.js');
var componentsSettings = require('./components/settings/settings.m.js');

// Inject all modules at this one centralized place.
var app = angular.module('app', [

  appCore.name,
  sharedUser.name,
  sharedSlider.name,

  componentsLoginSignUp.name,
  componentsChat.name,
  componentsSettings.name,

])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory 
    // bar above the keyboard for form inputs)
    if (window.cordova 
      && window.cordova.plugins 
      && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Choose your statusbar styling here.
    // $cordovaStatusbar.style(2);
    $cordovaStatusbar.hide();
  });

});

require('./app.r.js')(app); // Loads the routes.
