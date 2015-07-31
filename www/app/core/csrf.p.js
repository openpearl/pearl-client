module.exports = function(app) {app

  .config(function($httpProvider) {
    // CORS and CSRF.
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.interceptors.push('prlCSRF');
    // $httpProvider.interceptors.push('CookieServ');
  })
  
;};
