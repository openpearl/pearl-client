var appRoutes = require('./app.r.js');
console.log(appRoutes);

var appCore = require('./core/core.m.js');

var appChat = require('./components/chat/chat.m.js');

angular.module('app', [

  appCore.name,

  appChat.name,

])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(appRoutes);
