module.exports = function(app) {
  app.directive('prlIncludeReplace', [
    prlIncludeReplace
  ]);
};

function prlIncludeReplace() {
  return {
    require: 'ngInclude',
    restrict: 'A', /* optional */
    link: function (scope, el, attrs) {
      el.replaceWith(el.children());
    }
  };
}
