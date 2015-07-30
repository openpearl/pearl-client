// TODO: Move this to a better home.
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// ACTUAL CODE ****************************************************************

// Core.
var CoreM = require('./core/core.m.js');

// Shared.
var UserM = require('./shared/user/user.m.js');
var GoalsM = require('./shared/goals/goals.m.js');
var UserContextM = require('./shared/userContext/userContext.m.js');

// Utils.
var InputTypeM = require('./shared/inputType/inputType.d.js');

// Layouts.
var SliderM = require('./layout/slider/slider.m.js');

// Components.
var ChatM = require('./components/chat/chat.m.js');
var SettingsM = require('./components/settings/settings.m.js');

// Inject all modules at this one centralized place.
var app = angular.module('app', [

  // Core.
  CoreM.name,

  // Shared.
  UserM.name,
  GoalsM.name,
  UserContextM.name,

  // Utils.

  // Layouts.
  SliderM.name,

  // Components.
  ChatM.name,
  SettingsM.name,

]);

require('./app.run.js')(app); // Runs required files during the beginning.
require('./app.r.js')(app); // Loads the routes.

require('./shared/load.d.js')(app);