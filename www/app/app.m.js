var appCore = require('./core/core.m.js');
var sharedSlider = require('./shared/slider/slider.m.js');

var componentsLoginSignUp 
  = require('./components/loginSignUp/loginSignUp.m.js');
var componentsChat = require('./components/chat/chat.m.js');
var componentsSettings = require('./components/settings/settings.m.js');

var app = angular.module('app', [

  appCore.name,
  sharedSlider.name,

  componentsLoginSignUp.name,
  componentsChat.name,
  componentsSettings.name,

])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    $cordovaStatusbar.style(2);
    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   window.StatusBar.styleBlackTranslucent();
    // }
  });

});

require('./app.r.js')(app);
