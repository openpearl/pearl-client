module.exports = function(app) {
  app.constant('ApiEndpoint', {
    // TODO: Toggle between proxies using gulp.

    // url: 'https://1b68c6c2.ngrok.com'
    // url: 'https://1b68c6c2.ngrok.com/api'
    
    url: 'https://openpearl.herokuapp.com'
    // url: 'https://openpearl.herokuapp.com/api'
  });
};
