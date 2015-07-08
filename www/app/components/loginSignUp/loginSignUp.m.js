componentsLoginSignUp = angular.module('components.loginSignUp', []);

require('./loginSignUp.s.js')(componentsLoginSignUp);
require('./loginSignUp.c.js')(componentsLoginSignUp);
require('./loginSignUp.d.js')(componentsLoginSignUp);

module.exports = componentsLoginSignUp;
