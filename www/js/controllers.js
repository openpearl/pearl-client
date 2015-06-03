angular.module('starter.controllers', [])

.controller('PearlCtrl', function($scope) {})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
