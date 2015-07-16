module.exports = function(app) {
  app.factory('UserContextServ', [
    '$q',
    '$http',
    '$rootScope',

    '$ionicPlatform',
    '$cordovaHealthKit',
    'ApiEndpoint',
    UserContextServ
  ]);
};

function UserContextServ($q, $http, $rootScope, $ionicPlatform, $cordovaHealthKit, ApiEndpoint) {
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
          'HKQuantityTypeIdentifierStepCount'
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

  function localFetchUserContext(callback) {

  }

  function httpGetRequiredContext(callback) {
    var url = ApiEndpoint.url + "/pearl/context";
    $http.get(url)
      .success(function(data, status, headers, config) {
        console.log("localFetchUserContext success.");
        callback(data);
      })
      .error(function(data, status, headers, config) {
        console.log("localFetchUserContext error.");
      });
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
        var url = ApiEndpoint.url + "/documents/";
        var userContext = {"steps": steps};

        console.log("httpSendUserContext => userContext");
        console.log(userContext);

        $http.patch(url, userContext).success(httpPostTemporaryContext)
          .error(function(data, status, headers, config) {
            console.log("Unable to httpSendUserContext.");
            console.log(data);  
          });
      });
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

  // TODO: This url needs to be refactored out in the future.
  // TODO: Document this method better.
  function httpPostTemporaryContext(data, status, headers, config) {
    console.log("In httpPostTemporaryContext.");
    console.log(data);

    // FIXME: This is fake and temporary data.
    var url = ApiEndpoint.url + '/documents/';
    var placeholderData = {
      "keys": ["steps"]
    };

    $http.post(url, placeholderData).success(httpTempPostContextToPearl)
      .error(function(data, status, headers, config) {
        console.log("Unable to httpPostTemporaryContext.");
        console.log(data);  
      });
  }

  // TODO: This url needs to be refactored out in the future.
  // TODO: Document this method better.
  function httpTempPostContextToPearl(data, status, headers, config) {
    console.log("In httpTempPostContextToPearl.");
    console.log(data);

    // TODO: Populate messages with the next message.
    // Call method to populate messages and commands.
    var url = ApiEndpoint.url + "/pearl/context";
    $http.post(url, data["data"])
      .success(function(data, status, headers, config) {
        console.log("Success posting to /pearl/context.");
        console.log(data);

        $rootScope.$emit("converse:ready");
      })
      .error(function(data, status, headers, config) {
        console.log("Unable to httpTempPostContextToPearl.");
        console.log(data);
      });
  }

  return userContextServ;
}