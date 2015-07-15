module.exports = function(app) {
  app.factory('GoalsServ', [
    '$http',
    'UserServ',
    'ApiEndpoint',
    GoalsServ
  ]);
};

function GoalsServ($http, UserServ, ApiEndpoint) {

  var goalsServ = {
    goals: {},

    // localGetGoals: localGetGoals,

    httpGetGoals: httpGetGoals,
    httpToggleGoal: httpToggleGoal
  };

  // function localGetGoals() {
  //   console.log("localGetGoals");
  //   console.log(goalsServ.goals);
  //   return goalsServ.goals;
  // }

  function httpGetGoals() {
    var url = ApiEndpoint.url + '/goals';
    $http.get(url)
      .success(function(data) {
        goalsServ.goals = data;
        console.log("httpGetGoals successful.");
        console.log(goalsServ.goals);
      })  
      .error(function(error) {
        console.log("httpGetGoals unsuccessful.");
        console.log(error);
      });
  }

  function httpToggleGoal(goalID, checked) {
    var url = ApiEndpoint.url + '/goals/update';
    var data = {};
    data[goalID] = checked;

    console.log("Toggling httpToggleGoal.");
    console.log(data);

    $http.patch(url, data)
      .success(function(data) {
        goalsServ.httpGetGoals();
      })
      .error(function(error) {
        console.log("httpToggleGoal error: ");
        console.log(error);
      });
  }

  return goalsServ;
}
