module.exports = function(app) {
  app.factory('UserContextServ', [
    '$q',
    '$http',
    '$ionicPlatform',
    '$cordovaHealthKit',
    UserContextServ
  ]);
}

function UserContextServ($q, $http, $ionicPlatform, $cordovaHealthKit) {
  var userContextServ = {
    // Store.
    userContext: {},
    requiredContext: {},

    // Local.
    localRequestPermissions: localRequestPermissions,
    localFetchUserContext: localFetchUserContext,

    // Server.
    httpGetRequiredContext: httpGetRequiredContext,
    httpSendUserContext: httpSendUserContext
  };

  // Request Healthkit permissions.
  // TODO: Allow in the future to pass in permissions here.
  function localRequestPermissions(callback) {
    console.log("localRequestPermissions.");
    $ionicPlatform.ready(function() {
      console.log("ionicPlatform ready.");
      $cordovaHealthKit.isAvailable().then(function(yes) {
        // TODO: Don't make this hard coded. The server can pass this info.
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

        // TODO: Potentially make this into an event emitter.
        callback(); // If all is successful, do the next task.
      },
      function(no) {console.log("cordovaHealthKit is not available.");});
    });
  }

  function localFetchUserContext() {


    function getRequiredContext(callback) {
      var url = ApiEndpoint.url + "/pearl/context";
      $http.get(url)
        .success(function(data, status, headers, config) {
          console.log("Successfully received contexts.");
          vm.requiredContext = data;
          console.log(vm.requiredContext);
          callback();
        })
        .error();
    }

  }

  function httpGetRequiredContext() {

  }

  function httpSendUserContext() {

    console.log("I am now going to send user context."); 

    // TODO: Provide the serve the choice of choose the time and date.
    var m = moment().startOf('day');  
    var startDate = m.toDate();  
    var endDate = moment(m).add(1, 'd').toDate();

    getSample('HKQuantityTypeIdentifierStepCount', startDate, endDate)
      .then(function(steps) {

        // TODO: Make this more general and flexible.
        var route = ApiEndpoint.url + "/documents/";
        var userContext = {"steps": steps};

        $http.patch(route, userContext).success(httpPostTemporaryContext)
          .error(function(data, status, headers, config) {
            console.log("Unable to httpSendUserContext.");
            console.log(data);  
          });
      })
  }

  // HELPERS. ********************
  
  function getSample(sampleType, startDate, endDate) {
    // Provide a sampleType like this.
    // sampleType => 'HKQuantityTypeIdentifierStepCount'

    console.log("Getting sample from Healthkit.");

    // Return a promise.
    return $q(function (resolve, reject) {
      window.plugins.healthkit.querySampleType({
      // window.plugins.healthkit.sumQuantityType({
        'startDate': startDate,
        'endDate': endDate,
        'sampleType': sampleType
      }, function(healthkitData) {
        console.log("getSample from Healthkit success.");
        resolve(healthkitData);
      }, function () {
        console.log("getSample from Healthkit error.");
        reject();
      });
    });
  }

  // TODO: This route needs to be refactored out in the future.
  // TODO: Document this method better.
  function httpPostTemporaryContext(data, status, headers, config) {
    console.log("In httpPostTemporaryContext.");
    console.log(data);

    // FIXME: This is fake and temporary data.
    var placeholderData = {
      "keys": ["steps"]
    }

    $http.post(route, placeholderData).success(httpTempPostContextToPearl)
      .error(function(data, status, headers, config) {
        console.log("Unable to httpPostTemporaryContext.");
        console.log(data);  
      });
  }

  // TODO: This route needs to be refactored out in the future.
  // TODO: Document this method better.
  function httpTempPostContextToPearl(data, status, headers, config) {
    console.log("In httpTempPostContextToPearl.");
    console.log(data);

    // TODO: Populate messages with the next message.
    // Call method to populate messages and commands.
    var route = ApiEndpoint.url + "/pearl/context";
    $http.post(route, data["data"])
      .success(function(data, status, headers, config) {
        console.log("Success posting to /pearl/context.");
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        console.log("Unable to httpTempPostContextToPearl.");
        console.log(data);
      });
  }

  return userContextServ;
}
