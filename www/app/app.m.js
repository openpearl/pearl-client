// Run pre script.
require('./pre.js');

// Core.
var CoreM = require('./core/core.m.js');

// Models.
var UserM = require('./models/user/user.m.js');
var GoalsM = require('./models/goals/goals.m.js');
var UserContextM = require('./models/userContext/userContext.m.js');

// Layouts.
var SliderM = require('./components/slider/slider.m.js');

// Components.
var UtilsM = require('./components/utils/utils.m.js');
var ChatM = require('./components/chat/chat.m.js');
var SettingsM = require('./components/settings/settings.m.js');

// Inject all modules at this one centralized place.
var app = angular.module('app', [

  // Core.
  CoreM.name,

  // Models.
  UserM.name,
  GoalsM.name,
  UserContextM.name,

  // Layouts.
  SliderM.name,

  // Components.
  UtilsM.name,
  ChatM.name,
  SettingsM.name,

]);

require('./app.run.js')(app); // Runs required files during the beginning.
require('./app.r.js')(app); // Loads the routes.
