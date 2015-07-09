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

  this.getClientGoals = function getClientGoals() {
    var url = '/api/v1/goals';
    $http.get(url)
      .success(function(data) {
        // Voodoo magic right here.
        UserModel.setClientGoal(data);
        console.log(UserModel.clientGoals);
      })
      .error(function(error) {
        console.log("Goal fetching unsuccessful.");
        console.log(error);
      });
  }

  this.setClientGoal = function setClientGoal(goalID) {
    var url = '/api/v1/users/' + this.userID + '/goals/' + goalID;

    $http.put(url, UserModel.clientGoals[goalID])
      .success(function(data) {
      })
      .error(function(error) {
        return error;
      });
  }

  this.toggleClientGoal = function toggleClientGoal(goalID, checked) {
    var url = '/api/v1/goals/update';
    var data = {};
    data[goalID] = checked;
    console.log("toggling.");
    console.log(data);

    $http.patch(url, data)
      .success(function(data) {
        UserModel.setClientGoal(data);
      })
      .error(function(error) {
        return error;
      });
  }
}
