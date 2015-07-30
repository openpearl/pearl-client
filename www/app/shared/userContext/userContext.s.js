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

  // METHODS ******************************************************************

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

  function httpGetRequiredContext() {
    var url = ApiEndpoint.url + "/context";
    return $http.get(url);
  }

  function httpSendUserContext(contextRequest) {
    console.log("I am now going to send user context.");
    console.log(Object.size(contextRequest));

    // Do this after all data is collected from HealthKit.
    var url = ApiEndpoint.url + "/context/";
    var userContext = {};

    var finished = _.after(Object.size(contextRequest), function() {
      console.log("httpSendUserContext => userContext");
      console.log(userContext);

      $http.post(url, userContext)
        .success(function(data, status, headers, config) {
          $rootScope.$emit('converse:ready');  
        })
        .error(function(data, status, headers, config) {
          console.log("Unable to httpSendUserContext.");
          console.log(data);  
        });
    });

    // Fetch all request data from HealthKit.
    for (var i in  contextRequest) {
      var sampleRequest = contextRequest[i];

      var m = moment().startOf('day');  

      var sampleType = sampleRequest.sampleType;
      
      var startDate = new Date(sampleRequest.startDate * 1000) || new Date(0);
      var endDate = new Date(sampleRequest.endDate * 1000) || moment(m).add(1, 'd').toDate();

      getSample(sampleType, startDate, endDate)
        .then(function(sample) {
          userContext[sampleType] = sample;
          finished();
        });
    }
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
      }, function (error) {
        console.log("getSample from Healthkit error.");
        console.log(error);
        reject();
      });
    });
  }

  return userContextServ;
}
