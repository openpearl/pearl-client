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
      dMax = dMax + d3.max(data[i]);
    }

    // Set correctly scaled ranges for our x and y axes.
    var y = d3.scale.linear()
      .domain([0, dMax]).range([0 + margin, height - margin]);
    
    var x = {};
    for (var j in data) {
      x[j] = d3.scale.linear()
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
      .attr("transform", "translate(0, " + height +  ")");

    // Create a helper that generates nice line functions.
    var lines = {};
    for (var k in data) {
      lines[k] = 
    }

    var lineToday = d3.svg.line()
      .xToday(function(d,i) { return x(i); })
      .y(function(d) { return -1 * y(d); });
    var lineLastWeek = d3.svg.line()
      .xLastWeek(function(d,i) { return x(i); })
      .y(function(d) { return -1 * y(d); });
    var lineLastMonth = d3.svg.line()
      .xLastMonth(function(d,i) { return x(i); })
      .y(function(d) { return -1 * y(d); });
    var lineLastYear = d3.svg.line()
      .xLastYear(function(d,i) { return x(i); })
      .y(function(d) { return -1 * y(d); });

    g.append("svg:path").attr("d", lineToday(dToday));
    g.append("svg:path").attr("d", lineToday(dToday));
    g.append("svg:path").attr("d", lineToday(dToday));
    g.append("svg:path").attr("d", lineToday(dToday));

    // g.append("svg:line")
    //   .attr("x1", x(0))
    //   .attr("y1", -1 * y(0))
    //   .attr("x2", x(width))
    //   .attr("y2", -1 * y(0));

    // g.append("svg:line")
    //   .attr("x1", x(0))
    //   .attr("y1", -1 * y(0))
    //   .attr("x2", x(0))
    //   .attr("y2", -1 * y(d3.max(dToday)));

    g.selectAll(".xLabel")
      .dToday(x.ticks(5))
      .enter().append("svg:text")
      .attr("class", "xLabel")
      .text(String)
      .attr("x", function(d) { return x(d); })
      .attr("y", -1 * margin - 5)
      .attr("text-anchor", "middle")
      .filter(function (d, i) { return d === 0;  })
      .remove();
      // .filter(function (d, i) {
      //   console.log(i);
      //   console.log(dTodayLength); 
      //   return i === dTodayLength - 1;
      // })
      // .remove();
     
    g.selectAll(".yLabel")
      .dToday(y.ticks(4))
      .enter().append("svg:text")
      .attr("class", "yLabel")
      .text(String)
      .attr("x", margin + 5)
      .attr("y", function(d) { return -1 * y(d); })
      .attr("text-anchor", "right")
      .attr("dy", 4)
      .filter(function (d) { return d === 0;  })
      .remove();
  }
}

MoveLineCtrl.$inject = [];

function MoveLineCtrl() {

}
