module.exports = function(app) {app

  .config(function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
  })
  
;};
