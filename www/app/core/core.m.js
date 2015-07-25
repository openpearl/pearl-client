// Comment this line when in actual device.
// require('../../assets/js/browserSettings.js');

var appCore = angular.module('app.core', [
  'ngCookies',
	'ionic',
  // 'ngAnimate',
  'ngCordova',
  'ng-token-auth',

  'angular-toArrayFilter'
]);

require('./csrf.p.js')(appCore);
require('./apiEndpoint.const.js')(appCore);
require('./auth.config.js')(appCore);

module.exports = appCore;
