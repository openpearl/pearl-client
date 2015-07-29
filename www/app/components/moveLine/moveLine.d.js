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
    
    // Calculate the size of our graph. 
    var domElement = document.getElementById('move-line-container');
    var style = null;
    try { style = window.getComputedStyle(domElement, null); } 
    catch(e) {style = document.getElementById('example').currentStyle.height;} 
    var width = parseInt(style.getPropertyValue("width"), 10);
    var height = parseInt(style.getPropertyValue("height"), 10);

    // Load the data.
    var data = {
      today: [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7],
      lastWeek: [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7],
      lastMonth: [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7],
      lastYear: [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7]
    };
    
    // Set stylistic margins on edges.
    // TODO: May not be necessary to do SCSS.
    var margin = 0;

    // Get the max point of all the data.
    var dMax = 0;
    for (var i in data) {
      if (dMax < d3.max(data[i])) {
        dMax = d3.max(data[i]);
      }
    }

    // Set correctly scaled ranges for our x and y axes.
    var yScale = d3.scale.linear()
      // .domain([0, dMax]).range([0 + margin, height - margin]);
      .domain([0, dMax]).range([height - margin, 0 + margin]);
    
    var xScale = {};
    for (var j in data) {
      xScale[j] = d3.scale.linear()
        .domain([0, data[j].length - 1])
        .range([0 + margin, width - margin]);
    }

    // Create our SVG to the right dimensions. 
    var vis =  d3.select("#move-line-container")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    // Group the SVG and shift it to the right location.
    var g = vis.append("svg:g")
      // .attr("transform", "translate(0, " + height +  ")");
      .attr("transform", "translate(0,0)");

    // Create a helper that generates nice line functions.
    var lines = {};
    for (var k in data) {
      lines[k] = d3.svg.line()
        .x(function(d,i) { return xScale[k](i); })
        .y(function(d) { return yScale(d); });
    }

    // Append and render the lines first.
    for (var l in data) {
      g.append("svg:path").attr("d", lines[l](data[l]));
    }

    var xAxis = d3.svg.axis().scale(xScale["today"]).ticks(4).orient('top');
    var yAxis = d3.svg.axis().scale(yScale).ticks(4).orient('right');

    // Add the x-axis.
    vis.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      // .attr("transform", "translate(0,50)")
      .call(xAxis);

    // Add the y-axis.
    vis.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
      .filter(function (d, i) { return d === 0;  })
      .remove();
  }
}

MoveLineCtrl.$inject = [];

function MoveLineCtrl() {

}
