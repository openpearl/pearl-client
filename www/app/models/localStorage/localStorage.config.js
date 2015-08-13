module.exports = function(app) {
  app.config(LocalStorageService);
};

function LocalStorageService(localStorageServiceProvider) {
  
  localStorageServiceProvider
    .setPrefix('pearl')
    .setNotify(true, true)

;}
