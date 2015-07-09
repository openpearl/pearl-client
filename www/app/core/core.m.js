'use strict';

// Comment this line when in actual device.
require('../../assets/js/browserSettings.js');

var appCore = angular.module('app.core', [
	 
  // Angular modules.
	'ionic',
  'ngCordova',

  'ng-token-auth',
  'angular-toArrayFilter'
	
  // Our reusable cross app code modules.
	// 'blocks.exception', 
  // 'blocks.logger', 
  // 'blocks.router',
	    
	// 3rd Party modules
	// 'ngplus'

]);

require('./core.c.js')(appCore);
require('./apiEndpoint.const.js')(appCore);
require('./auth.config.js')(appCore);

module.exports = appCore;
