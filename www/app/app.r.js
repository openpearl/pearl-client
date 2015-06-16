module.exports = function(app) {
  app.config(appRoutes); 
}

function appRoutes($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the slider directive
  .state('slider', {
    url: "/slider",
    abstract: true,
    templateUrl: "app/shared/slider/slider.v.html"
  })

  // Each tab has its own nav history stack:
  .state('slider.chat', {
    url: '/chat',
    views: {
      'slider-chat': {
        templateUrl: 'app/components/chat/chat.v.html'
      },
      'slider-settings': {
        templateUrl: 'app/components/settings/settings.v.html'
      }
    }
  })

  // .state('slider.settings', {
  //   url: '/settings',
  //   views: {
  //     'slider-settings': {
  //       templateUrl: 'app/components/settings/settings.v.html'
  //     }
  //   }
  // })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/slider/chat');
}
