(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/davidzhu/PearlClient/www/app/app.m.js":[function(require,module,exports){
var appCore = require('./core/core.m.js');
var appChat = require('./components/chat/chat.m.js');

var app = angular.module('app', [

  appCore.name,
  appChat.name,

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

},{"./app.r.js":"/Users/davidzhu/PearlClient/www/app/app.r.js","./components/chat/chat.m.js":"/Users/davidzhu/PearlClient/www/app/components/chat/chat.m.js","./core/core.m.js":"/Users/davidzhu/PearlClient/www/app/core/core.m.js"}],"/Users/davidzhu/PearlClient/www/app/app.r.js":[function(require,module,exports){
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

},{}],"/Users/davidzhu/PearlClient/www/app/components/chat/chat.c.js":[function(require,module,exports){
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

  var vm = this;

  vm.message = "";
  vm.chatMessages = [];
  vm.inputOptions = ["Hello", "cats", "Another choice", "keep adding", "more"];

  vm.getStepCount = getStepCount;
  vm.sendInformation = sendInformation;

  // TODO: Test this when Healthkit entitlement becomes possible.
  $ionicPlatform.ready(function() {
    console.log("Platform is ready here.");
    $cordovaHealthKit.isAvailable().then(
      function(yes) {
        
        var readPermissions = [
          'HKQuantityTypeIdentifierDistanceWalkingRunning',
          'HKQuantityTypeIdentifierDistanceCycling',
          'HKQuantityTypeIdentifierStepCount',
        ];

        var writePermissions = [];
        console.log(readPermissions);      
        
        $cordovaHealthKit.requestAuthorization(
          readPermissions,
          writePermissions
        ).then(function(success){
          console.log("Requested permissions to read and write health information.");
         });
      },

      function(no) {

      });
  });

  function getStepCount(){
    console.log("Getting step count.");

    var m = moment().startOf('day');  
    var startDate = m.toDate();  
    var endDate = moment(m).add(1, 'd').toDate(); 
    
    console.log(startDate);
    console.log(endDate); 

    window.plugins.healthkit.sumQuantityType({
      'startDate': startDate,
      'endDate': endDate,
      'distanceUnit': 'mileUnit',
      // 'sampleType': 'HKQuantityTypeIdentifierDistanceWalkingRunning'
      'sampleType': 'HKQuantityTypeIdentifierStepCount'
    }, function(steps) {
      console.log("HealthKit Step Count Success (Changed): " + steps + " steps.");

      // Perform basic calculations to get time exercised.
      var milesWalked = steps / 2000.0;

      // http://en.wikipedia.org/wiki/Preferred_walking_speed
      var timeTaken = Math.round((milesWalked / 3.1) * 60);

      vm.chatMessages.push({
        username: "ai",
        message: "Duration of exercise today: " + timeTaken + " minutes."
      });

    }, function () {
      console.log("HealthKit Step Count Query unsuccessful.");
    });
  }

  function sendInformation($index){

    console.log($index);
    console.log(vm.inputOptions[$index]);

    vm.message = vm.inputOptions[$index];

    vm.getStepCount();
    console.log(vm.message);

    // TODO: Add data to speech bubble.
    // TODO: Move this either to a factory or a service.
    vm.chatMessages.push({
      username: 'client',
      message: vm.message
    });

    // TODO: Implement POST request.
    var url = "https://odmmjjialz.localtunnel.me/api/v1/tests/";
    var msg = vm.message;

    $http.post(url, {message: msg}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data.message);

        vm.chatMessages.push({
          userame: 'ai',
          message: data.message
        });

      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.message = "";
  }
}

},{}],"/Users/davidzhu/PearlClient/www/app/components/chat/chat.d.js":[function(require,module,exports){
module.exports = function(app) {
  
  app.directive('prlChatScroll', [
    '$ionicScrollDelegate', 
    PrlChatScroll
  ]);

  app.directive('prlChatInputSpace', [
    PrlChatInputSpace
  ]);

}

function PrlChatScroll($ionicScrollDelegate) {
  return {
    restrict: 'EA',
    scope: {
      val: '='
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue, oldValue) {
        if (newValue) {
          $ionicScrollDelegate.scrollBottom(true);
        }
      }, true);
    }
  }
}

function PrlChatInputSpace() {
  return {
    restrict: 'E'
  }
}

},{}],"/Users/davidzhu/PearlClient/www/app/components/chat/chat.m.js":[function(require,module,exports){
appChat = angular.module('app.chat', []);

require('./chat.c.js')(appChat);
require('./chat.d.js')(appChat);

module.exports = appChat;

},{"./chat.c.js":"/Users/davidzhu/PearlClient/www/app/components/chat/chat.c.js","./chat.d.js":"/Users/davidzhu/PearlClient/www/app/components/chat/chat.d.js"}],"/Users/davidzhu/PearlClient/www/app/core/core.c.js":[function(require,module,exports){
module.exports = function(app) {
  app.run(CoreController);
}

function CoreController() {
}

},{}],"/Users/davidzhu/PearlClient/www/app/core/core.m.js":[function(require,module,exports){
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

},{"../../assets/js/browserSettings.js":"/Users/davidzhu/PearlClient/www/assets/js/browserSettings.js","./core.c.js":"/Users/davidzhu/PearlClient/www/app/core/core.c.js"}],"/Users/davidzhu/PearlClient/www/assets/js/browserSettings.js":[function(require,module,exports){
window.plugins = {
  "healthkit": {
    available:function(abc){
      return false; 
    }
  }
};

},{}]},{},["/Users/davidzhu/PearlClient/www/app/app.m.js"]);
