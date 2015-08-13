module.exports = function(app) {
  app.factory('UserServ', [
    '$http',
    'ApiEndpoint',
    UserServ
  ]);
};

function UserServ($http, ApiEndpoint) {
  var userServ = {

    // Data.
    userID: "placeholderUserID",
    
    // Methods.
    submitLogout: submitLogout,

  };

  // METHODS ******************************************************************

  // Log out.
  function submitLogout(callback){
    var route = ApiEndpoint.url + '/auth/sign_out/';
    $http.delete(route).success(function() {
      callback();
    });
  }

  return userServ;
}
