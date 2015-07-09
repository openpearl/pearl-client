module.exports = function(app) {
  
  app.service('ServerClientGoalService', [
    '$http',
    'UserModel',
    'ApiEndpoint',
    ServerClientGoalService
  ]);

}

function ServerClientGoalService($http, UserModel, ApiEndpoint) {

  this.userID = UserModel.userID;
  this.clientGoals = UserModel.clientGoals;

  this.getClientGoals = function getClientGoals() {
    var url = ApiEndpoint.url + '/goals';
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
    var url = ApiEndpoint.url + '/users/' + this.userID 
      + '/goals/' + goalID;

    $http.put(url, UserModel.clientGoals[goalID])
      .success(function(data) {
      })
      .error(function(error) {
        return error;
      });
  }

  this.toggleClientGoal = function toggleClientGoal(goalID, checked) {
    var url = ApiEndpoint.url + '/goals/update';
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
