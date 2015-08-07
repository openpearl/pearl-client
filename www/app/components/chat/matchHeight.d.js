// TODO: This is probably not necessary.
// Remove or implement in the future if needed.

module.exports = function(app) {
  app.directive('prlMatchHeight', [
    prlMatchHeight
  ]);
};

function prlMatchHeight() {
  return {
    restrict: 'A',
    scope: {

    },
    link: function(scope, element, attrs) {

    }
  };
}
