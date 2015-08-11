var LocalStorageM = angular.module('LocalStorage', []);
require('./localStorage.config.js')(LocalStorageM);
module.exports = LocalStorageM;
