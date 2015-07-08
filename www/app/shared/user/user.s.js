module.exports = function(app) {
  app.factory('UserModel', [
    '$http',
    UserModel
  ]);
}

function UserModel($http) {
  var user = {

    userID: "placeholderUserID",
    clientGoals: {},

    setClientGoal: function(clientGoalsObj) {
      var _this = this;
      console.log(_this);

      for (i in clientGoalsObj) {
        _this.clientGoals[i] = clientGoalsObj[i]; 
      }
    },

    deleteClientGoal: function(goalID) {
      delete clientGoals[goalID];
    }

  };

  // var userID = 'placeholderUserID';
  // var clientGoals = {};

  // this.getUserID = function() {
  //   return userID;
  // }

  // this.setUserID = function(newUserID) {
  //   userID = newUserID;
  // }

  // this.getClientGoals = function() {
  //   return clientGoals;
  // }

  // this.setClientGoal = function(clientGoalsObj) {
  //   for (i in clientGoalsObj) {
  //     clientGoals[i] = clientGoalsObj[i]; 
  //   }
  // }

  // this.deleteClientGoal = function(goalID) {
  //   delete clientGoals[goalID];
  // }

  return user;
}
