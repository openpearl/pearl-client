module.exports = function(app) {app
  .factory('DotDotDot', [
    '$ionicScrollDelegate', 
    DotDotDot
  ])

  .config(httpIntercepting)
;};

function DotDotDot() {
  var dotDotDot = {
    
    request: function(config) {
      return config;
    },

    response: function(response) {
      return response;
    }

  };

  return dotDotDot;
}

function httpIntercepting($httpProvider) {
  $httpProvider.interceptors.push('DotDotDot');
}
