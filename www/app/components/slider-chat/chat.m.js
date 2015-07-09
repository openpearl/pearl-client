appChat = angular.module('components.chat', []);

require('./chat.d.js')(appChat);
require('./chat.s.js')(appChat);
require('./chat.c.js')(appChat);

module.exports = appChat;
