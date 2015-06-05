(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/davidzhu/pearl-client/www/app/app.r.js":[function(require,module,exports){
module.exports = function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "app/shared/tabs/tabs.v.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'app/components/chat/chat.v.html',
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'app/components/settings/settings.v.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chat');

}

},{}],"/Users/davidzhu/pearl-client/www/app/components/chat/chat.c.js":[function(require,module,exports){
var ChatController = function ChatController($http) {
  console.log("Am I even running?");
  // console.log($cordovaHealthKit);

  // $cordovaHealthKit.isAvailable().then(function(yes){
  //   var permissions = ['HKQuantityTypeIdentifierHeight'];
  //   console.log(permissions);

  //   $cordovaHealthKit.requestAuthorization(
  //     permissions,
  //     permissions
  //   ).then(function(success){

  //   });
  // }, function() {

  // });

  var vm = this;

  vm.message = "";
  vm.sendInformation = sendInformation;

  function sendInformation(){
    console.log(vm.message);

    // TODO: Add data to speech bubble.

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

ChatController.$inject = ["$http"];

module.exports = ChatController;

},{}],"/Users/davidzhu/pearl-client/www/app/components/chat/chat.m.js":[function(require,module,exports){
var ChatController = require('./chat.c.js');
console.log(ChatController);

console.log("Now I'm here!");

module.exports = angular.module('app.chat', [

])

.controller('ChatController', ChatController)

;

},{"./chat.c.js":"/Users/davidzhu/pearl-client/www/app/components/chat/chat.c.js"}],"/Users/davidzhu/pearl-client/www/app/core/core.m.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('app.core', [
	 
  // Angular modules.
	'ionic',
	
  // Our reusable cross app code modules.
	// 'blocks.exception', 
  // 'blocks.logger', 
  // 'blocks.router',
	    
	// 3rd Party modules
	// 'ngplus'

]);

},{}],"www/app/app.m.js":[function(require,module,exports){
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

},{"./app.r.js":"/Users/davidzhu/pearl-client/www/app/app.r.js","./components/chat/chat.m.js":"/Users/davidzhu/pearl-client/www/app/components/chat/chat.m.js","./core/core.m.js":"/Users/davidzhu/pearl-client/www/app/core/core.m.js"}]},{},["www/app/app.m.js"]);
