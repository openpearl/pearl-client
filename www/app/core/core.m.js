'use strict';

// Comment this line when in actual device.
require('../../assets/js/browserSettings.js');

var appCore = angular.module('app.core', [
	 
  // Angular modules.
	'ionic',
  'ngCordova',
	
  // Our reusable cross app code modules.
	// 'blocks.exception', 
  // 'blocks.logger', 
  // 'blocks.router',
	    
	// 3rd Party modules
	// 'ngplus'

]);

require('./core.c.js')(appCore);

module.exports = appCore;
