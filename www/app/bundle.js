(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/davidzhu/pearl-client/www/app/app.r.js":[function(require,module,exports){
module.exports = function(app) {
  app.config(appRoutes); 
}

function appRoutes($stateProvider, $urlRouterProvider) {

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

},{}],"/Users/davidzhu/pearl-client/www/app/components/chat/chat.m.js":[function(require,module,exports){
appChat = angular.module('app.chat', []);

require('./chat.c.js')(appChat);
module.exports = appChat;

},{"./chat.c.js":"/Users/davidzhu/pearl-client/www/app/components/chat/chat.c.js"}],"/Users/davidzhu/pearl-client/www/app/core/core.c.js":[function(require,module,exports){
module.exports = function(app) {
  app.run(CoreController);
}

function CoreController() {
}

},{}],"/Users/davidzhu/pearl-client/www/app/core/core.m.js":[function(require,module,exports){
'use strict';

// Comment this line when in actual device.
require('../../assets/js/browserSettings.js');

var appCore = angular.module('app.core', [
	 
  // Angular modules.
	'ionic',
  'ngCordova',
	
  // Our reusable cross app code modules.
	// 'blocks.exception', 
  // 'blocks.logger', 
  // 'blocks.router',
	    
	// 3rd Party modules
	// 'ngplus'

]);

require('./core.c.js')(appCore);

module.exports = appCore;

},{"../../assets/js/browserSettings.js":"/Users/davidzhu/pearl-client/www/assets/js/browserSettings.js","./core.c.js":"/Users/davidzhu/pearl-client/www/app/core/core.c.js"}],"/Users/davidzhu/pearl-client/www/assets/js/browserSettings.js":[function(require,module,exports){
window.plugins = {
  "healthkit": {
    available:function(abc){
      return false; 
    }
  }
};

},{}],"www/app/app.m.js":[function(require,module,exports){
var appCore = require('./core/core.m.js');
var appChat = require('./components/chat/chat.m.js');

var app = angular.module('app', [

  appCore.name,
  appChat.name,

])

.run(function($ionicPlatform) {
  console.log($ionicPlatform);
  $ionicPlatform.ready(function() {
    console.log("Is this ionicPlatform working?");
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
});

require('./app.r.js')(app);

},{"./app.r.js":"/Users/davidzhu/pearl-client/www/app/app.r.js","./components/chat/chat.m.js":"/Users/davidzhu/pearl-client/www/app/components/chat/chat.m.js","./core/core.m.js":"/Users/davidzhu/pearl-client/www/app/core/core.m.js"}]},{},["www/app/app.m.js"]);
