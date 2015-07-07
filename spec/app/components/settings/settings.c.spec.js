describe('SettingsController', function() {

  // Create a mock for the correct module?
  beforeEach(module('components.settings'));

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

  // describe('.setClientGoal', function() {
  //   it('PUTs updated clientGoal to the server', function() {
  //     var url = '/api/v1/'
  //   });
  // });
});
