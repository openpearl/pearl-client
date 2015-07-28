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
    var domElement = document.getElementById('move-line-container');
    var style = null;
    try {
      style = window.getComputedStyle(domElement, null);
    } catch(e) {
      style = document.getElementById('example').currentStyle.height;
    } 

    var width = parseInt(style.getPropertyValue("width"), 10);
    var height = parseInt(style.getPropertyValue("height"), 10);
    // var width = domElement.clientWidth;
    // var height = domElement.clientHeight;

    console.log(width);

    var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7];
    var dataLength = data.length;
    var margin = 0;
    
    // TODO: Not really sure how this works.
    var y = d3.scale.linear()
      .domain([0, d3.max(data)]).range([0 + margin, height - margin]);
    
    var x = d3.scale.linear()
      .domain([0, data.length - 1]).range([0 + margin, width - margin]);

    var vis =  d3.select("#move-line-container")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    var g = vis.append("svg:g")
      .attr("transform", "translate(0, " + height +  ")");

    var line = d3.svg.line()
      .x(function(d,i) { return x(i); })
      .y(function(d) { return -1 * y(d); });

    g.append("svg:path").attr("d", line(data));

    // g.append("svg:line")
    //   .attr("x1", x(0))
    //   .attr("y1", -1 * y(0))
    //   .attr("x2", x(width))
    //   .attr("y2", -1 * y(0));

    // g.append("svg:line")
    //   .attr("x1", x(0))
    //   .attr("y1", -1 * y(0))
    //   .attr("x2", x(0))
    //   .attr("y2", -1 * y(d3.max(data)));

    g.selectAll(".xLabel")
      .data(x.ticks(5))
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
      //   console.log(dataLength); 
      //   return i === dataLength - 1;
      // })
      // .remove();
     
    g.selectAll(".yLabel")
      .data(y.ticks(4))
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
