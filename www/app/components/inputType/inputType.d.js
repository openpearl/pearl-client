angular.module('inputType', [])
  .directive('prlInputType', function() {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attr) {
        var inputType = scope.$eval(attr.inputType);
        element.attr('type', inputType);
      }
  };
});
