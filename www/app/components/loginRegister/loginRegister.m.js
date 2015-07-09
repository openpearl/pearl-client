componentsLoginRegister = angular.module('components.loginRegister', []);

require('./loginRegister.s.js')(componentsLoginRegister);
require('./loginRegister.c.js')(componentsLoginRegister);
require('./loginRegister.d.js')(componentsLoginRegister);

module.exports = componentsLoginRegister;
