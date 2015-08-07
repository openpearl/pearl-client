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

    // localGetGoals: localGetGoals,

    httpGetGoals: httpGetGoals,
    httpToggleGoal: httpToggleGoal
  };

  // function localGetGoals() {
  //   console.log("localGetGoals");
  //   console.log(goalsServ.goals);
  //   return goalsServ.goals;
  // }

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
