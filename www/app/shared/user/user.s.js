module.exports = function(app) {
  app.factory('UserServ', [
    '$http',
    UserServ
  ]);
}

function UserServ($http) {
  var userServ = {
    userID: "placeholderUserID"
  };

  return userServ;
}
