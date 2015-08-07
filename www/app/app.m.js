// TODO: Move this to a better home.
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

logger = function() {
  var oldConsoleLog = null;
  var pub = {};

  pub.enableLogger =  function enableLogger() {
    if(oldConsoleLog === null) { return; }
    window.console.log = oldConsoleLog;
  };

  pub.disableLogger = function disableLogger() {
    oldConsoleLog = console.log;
    window.console.log = function() {};
  };

  return pub;
}();

// logger.disableLogger();

// ACTUAL CODE ****************************************************************

// Core.
var CoreM = require('./core/core.m.js');

// Models.
var UserM = require('./models/user/user.m.js');
var GoalsM = require('./models/goals/goals.m.js');
var UserContextM = require('./models/userContext/userContext.m.js');

// Utils.
// TODO: Put this in a folder.
var InputTypeM = require('./components/inputType/inputType.d.js');

// Layouts.
var SliderM = require('./components/slider/slider.m.js');

// Components.
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

  // Utils.

  // Layouts.
  SliderM.name,

  // Components.
  ChatM.name,
  SettingsM.name,

]);

require('./app.run.js')(app); // Runs required files during the beginning.
require('./app.r.js')(app); // Loads the routes.
