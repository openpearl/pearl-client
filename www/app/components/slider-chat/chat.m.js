var ChatM = angular.module('components.chat', []);

require('./chat.d.js')(ChatM);
require('./chat.s.js')(ChatM);
require('./chat.c.js')(ChatM);

module.exports = ChatM;
