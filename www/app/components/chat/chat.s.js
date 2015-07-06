module.exports = function(app) {
  
  app.factory('ionicRequestPermissions', [
    '$ionicPlatform',
    '$cordovaHealthKit',
    ionicRequestPermissions
  ]);

  app.factory('getSteps', [
    '$q',
    getSteps
  ]);

  app.factory('sendClientContext', [
    '$http',
    'getSteps',
    sendClientContext
  ]);

  app.factory('requestNextComm', [
    '$http',
    requestNextComm
  ]);
}

function ionicRequestPermissions($ionicPlatform, $cordovaHealthKit) {

  // console.log($ionicPlatform);
  console.log("I'm in the factory.");

  // TODO: Test this when Healthkit entitlement becomes possible.
  return function (callback) {
    $ionicPlatform.ready(function() {
      console.log("Platform is ready here.");
      $cordovaHealthKit.isAvailable().then(
        function(yes) {

          var readPermissions = [
            'HKQuantityTypeIdentifierDistanceWalkingRunning',
            'HKQuantityTypeIdentifierDistanceCycling',
            'HKQuantityTypeIdentifierStepCount',
          ];

          var writePermissions = [];
          console.log(readPermissions);      
          
          $cordovaHealthKit.requestAuthorization(
            readPermissions,
            writePermissions
          ).then(function(success){
            console.log("Requested permissions to read and write health information.");
           });

          callback();
        },
        function(no) {});
    });
  }
}

function getSteps($q) {
  return function (startDate, endDate) {
    console.log("Getting step count.");
    return $q(function (resolve, reject) {
      window.plugins.healthkit.sumQuantityType({
        'startDate': startDate,
        'endDate': endDate,
        'distanceUnit': 'mileUnit',
        'sampleType': 'HKQuantityTypeIdentifierStepCount'
      }, function(steps) {
        console.log("HealthKit Step Count Success: " + steps + " steps.");
        resolve(steps);
      }, function () {
        console.log("HealthKit Step Count Query unsuccessful.");
        reject();
      });
    });
  }
}

function sendClientContext($http, getSteps) {
  return function() {
    console.log("I am now going to send client context."); 

    var m = moment().startOf('day');  
    var startDate = m.toDate();  
    var endDate = moment(m).add(1, 'd').toDate(); 
    
    console.log(startDate);
    console.log(endDate);

    getSteps(startDate, endDate)
      .then(function(steps) {
        // TODO: Change this to the correct route.
        var route = CURRENT_HOST + "/api/v1/documents/2";
        var clientContext = { 
          "document": {
            // TODO: Change user_id.
            userID: 1,
            steps: steps
          }
        }

        $http.patch(route, clientContext).
          success(function(data, status, headers, config) {
            console.log(data.message);

            // TODO: Populate messages with the next message.
            // Call method to populate messages and commands.

          }).
          error(function(data, status, headers, config) {
            alert("An error happened sending the message.");
          });
      }, function() {
        console.log("Error in getSteps promise.");
      }); 
  }
}

function requestNextComm($http, callback) {

  // TODO: Maybe make this into its own service as well?
  var handleSuccessComm = function (data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("Conversation started!");
    console.log(data);

    // When we reach the last message, terminate the conversation.
    if (data === null) {
      console.log("Data is null.");
      return;
    }

    callback(data);
  }

  var handleErrorComm = function (data, status, headers, config) {
    console.log(data);  
    alert("Conversation start unsuccessful.");
  }

  return function (nextCommID) {
    var route = "/api/v1/communications"
    console.log(route);
    var commRequest = {
      commID: nextCommID
    };

    $http.post(route, commRequest).
      success(handleSuccessComm).
      error(handleErrorComm);
  }
}




