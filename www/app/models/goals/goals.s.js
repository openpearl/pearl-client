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
    goalCategories: [],

    httpGetGoals: httpGetGoals,
    httpToggleGoal: httpToggleGoal
  };

  function httpGetGoals(callback) {
    var url = ApiEndpoint.url + '/goals';
    $http.get(url)
      .success(function(data) {
        // console.log(data);

        var goalCategories = [];
        for (var category in data.data) {
          goalCategories.push(data.data[category]);          
        }

        for (var i in goalCategories) {
          goalCategories[i].goalsLength = 0;
          if (goalCategories[i].goals) {
            goalCategories[i].goalsLength = 
              Object.size(goalCategories[i].goals);
          }
        }

        goalsServ.goalCategories = goalCategories;
        console.log("httpGetGoals successful.");
        console.log(goalsServ.goalCategories);
      })  
      .error(function(error) {
        console.log("httpGetGoals unsuccessful.");
        console.log(error);
      });
  }

  function httpToggleGoal(goal) {
    var url = ApiEndpoint.url + '/goals';
    console.log("Toggling httpToggleGoal.");

    $http.patch(url, {goals: goal})
      .success(function(response) {
      })
      .error(function(response) {
        console.log("httpToggleGoal error: ");
        console.log(error);
      });
  }

  return goalsServ;
}
