var InputBubbleM = require('../inputBubble/inputBubble.m.js');

var InputSpaceM = angular.module('chat.inputSpace', [
  InputBubbleM.name
]);

require('./inputSpace.d.js')(InputSpaceM);
module.exports = InputSpaceM;
