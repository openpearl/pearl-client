var ChatM = angular.module('components.chat', ['ngAnimate']);
// var ChatM = angular.module('components.chat', []);

require('./loginStoryboard.const.js')(ChatM);

require('./chat.d.js')(ChatM);
require('./loginRegister.s.js')(ChatM);
require('./chat.s.js')(ChatM);
require('./chat.c.js')(ChatM);

module.exports = ChatM;
