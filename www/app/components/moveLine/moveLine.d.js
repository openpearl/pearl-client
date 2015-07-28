module.exports = function(app) {
  app.directive('prlMoveLine', [
    prlMoveLine
  ]);
};

function prlMoveLine() {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: '_templates/moveLine.t.html',
    replace: true,
    bindToController: true,
    controller: MoveLineCtrl,
    controllerAs: 'moveLineCtrl',
    link: MoveLineLink
  };

  function MoveLineLink() {
    
    // This is all playground stuff.

    var data = [{
        "sale": "202",
        "year": "2000"
    }, {
        "sale": "215",
        "year": "2001"
    }, {
        "sale": "179",
        "year": "2002"
    }, {
        "sale": "199",
        "year": "2003"
    }, {
        "sale": "134",
        "year": "2003"
    }, {
        "sale": "176",
        "year": "2010"
    }];


  }
}

MoveLineCtrl.$inject = [];

function MoveLineCtrl() {

}
