var LoginRegisterM = angular.module('components.loginRegister', []);

require('./loginRegister.s.js')(LoginRegisterM);
require('./loginRegister.c.js')(LoginRegisterM);
require('./loginRegister.d.js')(LoginRegisterM);

module.exports = LoginRegisterM;
