module.exports = function(app) {
  app.controller('SettingsController', [
    SettingsController
  ]);
}

function SettingsController() {
  var vm = this;

  vm.searchText;
  vm.goals = [
    {name: "Be more active"},
    {name: "Lose weight"},
    {name: "Sleep well"}
  ];

  vm.testMessage = "Hello world!";
  vm.testClick = testClick;

  function testClick() {
    console.log("swagswag");
  }

  console.log("Sup syo.");
}
