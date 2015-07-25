module.exports = function(app) {

  app

  .provider('prlCSRF',[function(){
    var headerName = 'X-CSRFToken';
    var cookieName = 'csrftoken';
    var allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    this.setHeaderName = function(n) {
      headerName = n;
    };
    
    this.setCookieName = function(n) {
      cookieName = n;
    };
    
    this.setAllowedMethods = function(n) {
      allowedMethods = n;
    };
    
    this.$get = ['$cookies', function($cookies){

      // console.log("dbg: csrf cookies");
      // console.log($cookies);

      return {
        'request': function(config) {
          if(allowedMethods.indexOf(config.method) === -1) {
            // do something on success
            config.headers[headerName] = $cookies[cookieName];
          }
          return config;
        }
      };
    }];

  }])

  // .factory('CookieServ', ['$cookies', function($cookies) {
  //   var cookieServ = {
  //     request: function(config) {
  //       return config;
  //     },

  //     response: function(response) {
  //       console.log("response");
  //       console.log(response);

  //       console.log("cookies");
  //       console.log($cookies);

  //       return response;
  //     }
  //   };

  //   return cookieServ;
  // }])

  .config(function($httpProvider) {
    // CORS and CSRF.
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.interceptors.push('prlCSRF');
    // $httpProvider.interceptors.push('CookieServ');
  });

};
