module.exports = function(app) {
  app.config(appRoutes); 
};

function appRoutes($httpProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers
     .common['X-Requested-With'];

  $stateProvider

  .state('slider', {
    url: "/slider",
    template: "<prl-slider></prl-slider>"
  });

  // Default route.
  $urlRouterProvider.otherwise('/slider');
}
