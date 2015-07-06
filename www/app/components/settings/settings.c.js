module.exports = function(app) {
  app.controller('SettingsController', [
    '$http',
    '$ionicPlatform',
    '$ionicScrollDelegate', 
    '$cordovaHealthKit',
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

  // bindSearch: function() {
  //   $messages = $(".message-card");
  //   $('#searchBarNew').keyup(function() {
  //     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
  //     $messages.show().filter(function() {
  //       var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
  //       return !~text.indexOf(val);
  //     }).hide();
  //   });
  // },

  console.log("Sup syo.");
}
