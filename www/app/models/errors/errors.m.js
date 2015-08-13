var ErrorsM = angular.module('errors', [])
  .config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('Error404Interceptor');
  }])
  .factory('Error404Interceptor',['$q', function($q) {
    
    _this = {};
    _this.isOffline = false;
    
    _this.response = function(response) {
      // console.log(response.status + ' intercepted');
      _this.isOffline = false;
      return response || $q.when(response);
    };

    _this.responseError = function(response){
      // console.log(response.status + ' intercepted');

      if (response.status === 404) {
        _this.isOffline = true;
      }

      return $q.reject(response);
    }; 

    return _this;
  }]);

module.exports = ErrorsM;
