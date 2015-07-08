describe('SettingsController', function() {

  // Create a mock for the correct module?
  beforeEach(module('components.settings'));
  beforeEach(module('shared.user'));

  var SettingsController;
  var stateMock;
  var ionicPlatformMock;
  var httpLocalBackend;

  // TODO: Figure out what this does.
  beforeEach(angular.mock.inject(function (_$controller_) {

    stateMock = {
      go: jasmine.createSpy("go")
    }

    ionicPlatformMock = jasmine.createSpyObj('ionicPlatformMock', [
      'on'
    ]);

    SettingsController = _$controller_('SettingsController', {
      $state: stateMock,
      $ionicPlatform: ionicPlatformMock
    })
  }));

  beforeEach(inject(function ($httpBackend) {
    httpLocalBackend = $httpBackend;
  }));

  it("has a userID", function() {
    expect(SettingsController.userID).not.toBe(undefined);
  });

  describe('.getClientGoals', function() {
    it('GETs clientGoals from the server', function() {

      var url = '/api/v1/users/' + SettingsController.userID + '/goals'
      var httpResponse = {
        "adslkjaadsa": {name: "Be more active", checked: true},
        "adfasdfasdf": {name: "Lose weight", checked: false},
        "asdadsasdas": {name: "Sleep well", checked: false}
      }
      httpLocalBackend.expectGET(url).respond(200, httpResponse);

      SettingsController.getClientGoals();
      httpLocalBackend.flush();

      expect(SettingsController.clientGoals).toEqual(httpResponse);
    });
  });

  describe('.setClientGoal', function() {
    it('PUTs updated clientGoal to the server', function() {

      SettingsController.clientGoals = {
        "asdasdasd": {name: "Be more active", checked: false}
      }

      var goalID = "asdasdasd"; 
      var url = '/api/v1/users/' + SettingsController.userID 
        + '/goals/' + goalID;
      httpLocalBackend.expectPUT(url).respond(200);
      SettingsController.setClientGoal(goalID);

      // TODO: Still not sure what this does.
      // Has to do with async unit testing for requests.
      httpLocalBackend.flush();
    });
  });

  afterEach(function() {
    httpLocalBackend.verifyNoOutstandingExpectation();
    httpLocalBackend.verifyNoOutstandingRequest();
  });
});
