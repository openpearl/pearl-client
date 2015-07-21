module.exports = function(app) {
  app.config(appRoutes); 
};

function appRoutes($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('slider', {
    url: "/slider",
    template: "<prl-slider></prl-slider>"
  });

  // Default route.
  $urlRouterProvider.otherwise('/slider');
}
