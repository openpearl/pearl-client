Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

logger = function() {
  var oldConsoleLog = null;
  var pub = {};

  pub.enableLogger =  function enableLogger() {
    if(oldConsoleLog === null) { return; }
    window.console.log = oldConsoleLog;
  };

  pub.disableLogger = function disableLogger() {
    oldConsoleLog = console.log;
    window.console.log = function() {};
  };

  return pub;
}();

// logger.disableLogger();

module.exports = {};
