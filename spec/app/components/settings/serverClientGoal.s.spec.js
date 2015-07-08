describe('ServerClientGoalService', function() {

  // Create a mock for the correct module?
  beforeEach(module('components.settings'));
  beforeEach(module('shared.user'));

  var ServerClientGoalService;
  var httpLocalBackend;

  var calledBack = false;
  var callbackTrue = function() {
    calledBack = true;
    return 5;
  }

  // TODO: Figure out what this does.
  // beforeEach(inject(function (_$service_) {
  //   ServerClientGoalService = _$service_('ServerClientGoalService', {});
  // }));

  // Weird. Why does this version work, but not the other one?
  // http://stackoverflow.com/questions/19963019/angular-jasmine-how-to-inject-services-with-dots-in-their-names
  beforeEach(inject(["ServerClientGoalService", function (_ServerClientGoalService_) {
    ServerClientGoalService = _ServerClientGoalService_;
  }]));

  beforeEach(inject(function ($httpBackend) {
    httpLocalBackend = $httpBackend;
    calledBack = false;
  }));

  describe('.getClientGoals', function() {
    it('GETs clientGoals from the server', function() {

      var url = '/api/v1/users/' + ServerClientGoalService.userID + '/goals'
      var httpResponse = {
        "adslkjaadsa": {name: "Be more active", checked: true},
        "adfasdfasdf": {name: "Lose weight", checked: false},
        "asdadsasdas": {name: "Sleep well", checked: false}
      }
      httpLocalBackend.expectGET(url).respond(200, httpResponse);

      ServerClientGoalService.getClientGoals(callbackTrue);
      httpLocalBackend.flush();

      expect(ServerClientGoalService.clientGoals).toEqual(httpResponse);
    });
  });

  describe('.setClientGoal', function() {
    it('PUTs updated clientGoal to the server', function() {

      ServerClientGoalService.clientGoals = {
        "asdasdasd": {name: "Be more active", checked: false}
      }

      var goalID = "asdasdasd"; 
      var url = '/api/v1/users/' + ServerClientGoalService.userID 
        + '/goals/' + goalID;
      httpLocalBackend.expectPUT(url).respond(200);
      ServerClientGoalService.setClientGoal(goalID, callbackTrue);
      httpLocalBackend.flush();
      expect(calledBack).toBe(true);
    });
  });

  afterEach(function() {
    httpLocalBackend.verifyNoOutstandingExpectation();
    httpLocalBackend.verifyNoOutstandingRequest();
  });
});
