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

    // Set stylistic margins on edges.
    // TODO: May not be necessary to do SCSS.
    var margin = 0;

    // Set up our time interval.
    var currentTime = new Date();
    var today = d3.time.day(currentTime);
    var pastWeek = d3.time.day.offset(today, -7);
    var pastMonth = d3.time.month.offset(today, -1);
    var pastYear = d3.time.year.offset(today, -1);

    // console.log(currentTime);
    // console.log(today);
    // console.log(pastWeek);
    // console.log(pastMonth);
    // console.log(pastYear);

    var data = [
      {timestamp: currentTime, steps: 4506},
      {timestamp: d3.time.hour.offset(currentTime, -3), steps: 2342},
      {timestamp: d3.time.hour.offset(currentTime, -5), steps: 1000},
      {timestamp: d3.time.hour.offset(currentTime, -8), steps: 200},
      {timestamp: today, steps: 0},
      {timestamp: d3.time.day.offset(today, -1), steps: 3000},
      {timestamp: d3.time.day.offset(today, -2), steps: 5000},
      {timestamp: d3.time.day.offset(today, -3), steps: 2000},
      {timestamp: d3.time.day.offset(today, -4), steps: 4000},
      
      // {timestamp: pastWeek, steps: 6347},
      {timestamp: d3.time.week.offset(today, -1), steps: 1245},
      {timestamp: d3.time.week.offset(today, -2), steps: 6231},
      {timestamp: d3.time.week.offset(today, -3), steps: 7332},
      {timestamp: d3.time.week.offset(today, -4), steps: 3623},

      {timestamp: d3.time.month.offset(pastWeek, -1), steps: 1000},
      {timestamp: d3.time.month.offset(pastWeek, -2), steps: 4123},
      {timestamp: d3.time.month.offset(pastWeek, -3), steps: 5142},
      {timestamp: d3.time.month.offset(pastWeek, -4), steps: 5167},
      {timestamp: d3.time.month.offset(pastWeek, -5), steps: 1234},
      {timestamp: d3.time.month.offset(pastWeek, -6), steps: 6234},
      {timestamp: d3.time.month.offset(pastWeek, -7), steps: 1000},
      {timestamp: d3.time.month.offset(pastWeek, -8), steps: 4123},
      {timestamp: d3.time.month.offset(pastWeek, -9), steps: 1252},
      {timestamp: d3.time.month.offset(pastWeek, -10), steps: 5623},
      {timestamp: d3.time.month.offset(pastWeek, -11), steps: 1234},
      {timestamp: d3.time.month.offset(pastWeek, -12), steps: 1234},
      {timestamp: d3.time.month.offset(pastWeek, -13), steps: 1234},
    ];

    // Break the data into two parts for a piecewise graph.
    for (var i in data) {
      if (today > data[i].timestamp) {
        var liveData = data.splice(0, i);
        break;
      }
    }

    var earliestDate = data[data.length - 1].date;

    // Create the actual visualization.
    var vis = d3.select("#move-line-container").append("svg")
      .attr("width", width)
      .attr("height", height);

    // Define the gradient
    var gradient = vis.append("svg:defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "50%")
        .attr("x2", "100%")
        .attr("y2", "50%")
        .attr("spreadMethod", "pad");

    // Define the gradient colors
    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#000000")
        .attr("stop-opacity", 0.15);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#000000")
        .attr("stop-opacity", 1);

    // Create groupings of lines and markers.
    var lines = vis.append("g");
    var markers = vis.append("g");

    // Zooming stuff.
    var zoomFactor = 5;
    var timeRange = [
      width,
      width * 0.5,
      width * 0.2,
      width * 0.1,
      0
    ];

    var timeScale = d3.time.scale()
      .domain([
        currentTime,
        today,
        pastWeek,
        pastMonth,
        pastYear
      ])
      .range(timeRange);

    var steps = [];
    for (var i in data) {
      steps.push(data[i].steps);
    }

    var stepGoal = 10000; // Hard coded for now.
    var _stepsMax = d3.max([d3.max(steps), stepGoal]);

    var stepsScale = d3.scale.linear()
      .domain([0, _stepsMax])
      .range([0, height * 0.8]);

    var basicLineFn = d3.svg.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })
      .interpolate('linear');

    // Draw goal.
    lines.append("path")
      .attr("class", "polylinear stepGoal")
      .attr("d", basicLineFn([
        {x: 0, y: height - stepsScale(stepGoal)},
        {x: d3.max(timeRange), y: height - stepsScale(stepGoal)}
      ]));
    
    var format = d3.format("0,000");
    markers.append("text")
      .attr({
        class: "stepGoalLabel",
        transform: "translate(" + 
          (width - 40) + "," + 
          (height - stepsScale(stepGoal) - 5) + ")" 
      })
      .text(format(stepGoal));

    // markers.selectAll(".polylinear.point")
    //   .data(data) // Compares number of data points and number of elements.
    //   .enter()
    //     .append("circle")
    //     .attr({
    //       "class": "polylinear point",
    //       r: 1,
    //       transform: function(d) { 
    //         return (
    //           "translate(" + 
    //             timeScale(d.timestamp) + "," +
    //             (300 - stepsScale(d.steps)) + 
    //           ")"
    //         ); 
    //       }
    //     });

    var stepsLineFn = d3.svg.line()
      .x(function(d) { return timeScale(d.timestamp); })
      .y(function(d) { return height - stepsScale(d.steps); })
      .interpolate('linear');

    lines.append("path")
      .attr("class", "stepsLine")
      .attr({
        d: stepsLineFn(data),
      })
      .attr('stroke', 'url(#gradient)');

    lines.append("path")
      .attr("class", "stepsLine")
      .attr({
        d: stepsLineFn(liveData),
      })
      .attr('stroke', 'black');

    var verticalDividerFn = d3.svg.line()
      .x(function(d) { return timeScale(d.timestamp); })
      .y(function(d) { return height - stepsScale(d.steps); })
      .interpolate('linear');

    lines.selectAll("vertical-divider")
      .data(timeRange)
      .enter()
        .append("path")
        .attr({
          "class": "vertical-divider",
          d: function(d, i) {
            return (
              "M" + timeRange[i] + "," + height + "V-" + height
            );
          }
        });

    var timeLabels = ["today", "-7d", "-1m", "-1y"];
    markers.selectAll(".polylinear.timeLabel")
      .data(timeLabels)
      .enter()
        .append("text")
        .attr({
          class: "timeLabel",
          transform: function(d, i) {

            var difference = timeRange[i+1] - timeRange[i];
            var displacement = timeRange[i+1] + 4;

            return "translate(" + displacement + ",12)"; 
          }
        })
        .text(function(d) { return d; });

  }
}

MoveLineCtrl.$inject = [];

function MoveLineCtrl() {

}
