module.exports = function(app) {
  app.service('UserModel', [
    UserModel
  ]);
}

function UserModel() {

  this.userID = 'placeholderUserID';

}
