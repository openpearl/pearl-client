module.exports = function(app) {
  app.constant('ApiEndpoint', {
    // TODO: Toggle between proxies using gulp.
    // url: 'http://172.16.42.7:8100/api'
    url: '/api'
    // url: 'https://openpearl.herokuapp.com'
    // url: 'https://openpearl.herokuapp.com'
  });
};
