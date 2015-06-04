(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/davidzhu/pearl-client/www/js/controllers.js":[function(require,module,exports){
module.exports = angular.module('pearl-client.controllers', [])
  .controller('PearlCtrl', PearlCtrl);

PearlCtrl.$inject = ["$http"];

function PearlCtrl($http) {
  var vm = this;

  vm.message = "";
  vm.sendInformation = sendInformation;

  function sendInformation(){
    console.log(vm.message);

    // TODO: Implement POST request.
    var url = "http://localhost:3000/test";
    var msg = vm.message;

    $http.post(url, {msg:msg}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    vm.message = "";
  }
}

},{}],"/Users/davidzhu/pearl-client/www/js/services.js":[function(require,module,exports){
module.exports = angular.module('pearl-client', []);

},{}],"www/js/app.js":[function(require,module,exports){
var controllers = require("./controllers");
var services = require("./services");

angular.module('pearl-client', [
  'ionic', 
  'ngCordova',
  controllers.name, 
  services.name
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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.pearl', {
    url: '/pearl',
    views: {
      'tab-pearl': {
        templateUrl: 'templates/tab-pearl.html',
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/pearl');

});

},{"./controllers":"/Users/davidzhu/pearl-client/www/js/controllers.js","./services":"/Users/davidzhu/pearl-client/www/js/services.js"}]},{},["www/js/app.js"]);
