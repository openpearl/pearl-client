module.exports = function(app) {
  app.controller('SettingsController', [
    '$state',
    SettingsController
  ]);
}

function SettingsController($state) {
  var vm = this;

  vm.searchText;
  vm.goals = [
    {name: "Be more active"},
    {name: "Lose weight"},
    {name: "Sleep well"}
  ];

  vm.clickLogout = clickLogout;

  function clickLogout() {

    // TODO: Delete session.
    $state.go('login');
  }
}
