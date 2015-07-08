describe('SettingsController', function() {

  // Create a mock for the correct module?
  beforeEach(module('components.settings'));
  beforeEach(module('shared.user'));

  var SettingsController;
  var stateMock;
  var ionicPlatformMock;

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

  it("has a userID", function() {
    expect(SettingsController.userID).not.toBe(undefined);
  });

});
