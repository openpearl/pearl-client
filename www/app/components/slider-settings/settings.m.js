appSettings = angular.module('components.settings', []);

require('./settings.c.js')(appSettings);
require('./serverClientGoal.s.js')(appSettings);
require('./settings.d.js')(appSettings);


module.exports = appSettings;
