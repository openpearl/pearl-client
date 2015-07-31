var SettingsM = angular.module('components.settings', []);

require('./settings.d.js')(SettingsM);
require('../moveLine/moveLine.d.js')(SettingsM);

module.exports = SettingsM;
