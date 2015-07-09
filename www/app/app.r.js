module.exports = function(app) {
  app.config(appRoutes); 
}

function appRoutes($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: "/login",
    template: "<prl-login-register></prl-login-register>"
    // templateUrl: "app/components/loginSignUp/loginSignUp.t.html",
    // controller: 'LoginSignUpController',
    // controllerAs: 'loginCtrl'
  })

  // setup an abstract state for the slider directive
  .state('slider', {
    url: "/slider",
    // abstract: true,
    templateUrl: "app/components/slider/slider.t.html"
  });

  // If none of the above states are matched, use this as the fallback.
  $urlRouterProvider.otherwise('/login');
}
