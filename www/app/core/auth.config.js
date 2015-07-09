module.exports = function(app) {
  app.config(AuthConfiguration);
}

function AuthConfiguration($authProvider) {
  $authProvider.configure({
    // apiUrl: 'https://34a417f0.ngrok.com'
    apiUrl: '/api/v1'
  });
}
