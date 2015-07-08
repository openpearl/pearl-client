module.exports = function(app) {
  
  app.service('ServerClientGoalService', [
    '$http',
    'UserModel',
    ServerClientGoalService
  ]);

}

function ServerClientGoalService($http, UserModel) {

  this.userID = UserModel.userID;
  this.clientGoals = UserModel.clientGoals;

  this.getClientGoals = function getClientGoals(callback) {
    var url = '/api/v1/users/'+ this.userID + '/goals';
    $http.get(url)
      .success(function(data) {
        // Voodoo magic right here.
        UserModel.setClientGoal(data);
        callback(data);
      })
      .error(function(error) {
        console.log("Goal fetching unsuccessful.");
        console.log(error);
      });
  }

  this.setClientGoal = function setClientGoal(goalID, callback) {
    var url = '/api/v1/users/' + this.userID + '/goals/' + goalID;

    $http.put(url, UserModel.clientGoals[goalID])
      .success(function(data) {
        callback(data);
      })
      .error(function(error) {
        return error;
      });
  }
}
