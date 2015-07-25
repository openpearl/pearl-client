module.exports = function(app) {
  app.config(AuthConfiguration);
};

function AuthConfiguration($authProvider, ApiEndpoint) {
  $authProvider.configure({
    apiUrl: ApiEndpoint.url,
    storage: 'localStorage'
  });
}
