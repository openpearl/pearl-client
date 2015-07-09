// Comment this line when in actual device.
// require('../../assets/js/browserSettings.js');

var appCore = angular.module('app.core', [
	'ionic',
  'ngCordova',
  'ng-token-auth',
  'angular-toArrayFilter'
]);

require('./apiEndpoint.const.js')(appCore);
require('./auth.config.js')(appCore);

module.exports = appCore;
