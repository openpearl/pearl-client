var MessagesM = require('./messages/messages.m.js');
var InputSpaceM = require('./inputSpace/inputSpace.m.js');

var ChatM = angular.module('components.chat', [
  MessagesM.name,
  InputSpaceM.name
]);

require('./loginStoryboard.const.js')(ChatM);
require('./loginRegister.s.js')(ChatM);
require('./chat.s.js')(ChatM);
require('./chat.d.js')(ChatM);

module.exports = ChatM;
