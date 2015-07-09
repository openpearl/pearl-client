module.exports = function(app) {
  app.constant('ApiEndpoint', {
    // TODO: Toggle between proxies using gulp.
    url: 'http://172.16.42.7:8100/api'
    // url: 'https://1b68c6c2.ngrok.com'
  });
}
