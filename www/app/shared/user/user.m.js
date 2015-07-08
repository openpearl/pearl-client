var sharedUser = angular.module('shared.user', []);
require('./user.s.js')(sharedUser);
module.exports = sharedUser;
