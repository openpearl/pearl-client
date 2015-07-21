var SettingsM = angular.module('components.settings', []);

require('./settings.c.js')(SettingsM);
require('./settings.d.js')(SettingsM);

module.exports = SettingsM;
