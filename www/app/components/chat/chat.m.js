appChat = angular.module('components.chat', []);

require('./chat.c.js')(appChat);
require('./chat.d.js')(appChat);

module.exports = appChat;
