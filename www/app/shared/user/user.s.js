module.exports = function(app) {
  app.factory('UserServ', [
    '$http',
    UserServ
  ]);
}

function UserServ($http) {
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

  return user;
}
