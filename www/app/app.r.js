module.exports = function(app) {
  app.config(appRoutes); 
}

function appRoutes($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "app/components/loginSignUp/loginSignUp.t.html",
    controller: 'LoginSignUpController',
    controllerAs: 'loginCtrl'
  })

  // setup an abstract state for the slider directive
  .state('slider', {
    url: "/slider",
    abstract: true,
    templateUrl: "app/shared/slider/slider.t.html"
  })

  // setup an abstract state for the slider directive
  // .state('initial', {
  //   url: "/initial",
  //   abstract: true,
  //   templateUrl: "app/shared/slider/slider.v.html"
  // })

  // Each tab has its own nav history stack:
  .state('slider.chat', {
    url: '/chat',
    views: {
      'slider-chat': {
        // templateUrl: 'app/components/chat/chat.t.html'
        template: '<prl-chat />'
      },
      'slider-settings': {
        templateUrl: 'app/components/settings/settings.t.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  // $urlRouterProvider.otherwise('/slider/chat');
}
