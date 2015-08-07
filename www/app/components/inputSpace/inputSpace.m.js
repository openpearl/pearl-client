var ChoiceBubbleM = require('../choiceBubble/choiceBubble.m.js');
var InputBubbleM = require('../inputBubble/inputBubble.m.js');

var InputSpaceM = angular.module('chat.inputSpace', [
  ChoiceBubbleM.name,
  InputBubbleM.name
]);

require('./inputSpace.d.js')(InputSpaceM);
module.exports = InputSpaceM;
