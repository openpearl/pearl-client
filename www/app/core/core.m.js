var appCore = angular.module('app.core', [
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
