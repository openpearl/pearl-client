module.exports = function(app) {
  app.service('UserModel', [
    '$http',
    UserModel
  ]);
}

function UserModel($http) {
  this.userID = 'placeholderUserID';
}
