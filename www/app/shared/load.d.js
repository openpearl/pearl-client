module.exports = function(app) {
  app.directive('prlLoad', [
    '$parse',
    prlLoad
  ]);
};

function prlLoad($parse) {

  console.log("prlLoaded!");

  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var fn = $parse(attrs.prlLoad);
      
      console.log("prlLoad Happening");
      
      elem.on('load', function (event) {
        scope.$apply(function() {
          fn(scope, { $event: event });
        });
      });
    }
  };
}
