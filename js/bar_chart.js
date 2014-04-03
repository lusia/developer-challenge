BarChart = function () {
	/**
	 * Render chart
	 * @param containerId - element where chart is placed
	 * @param team - array of players
	 */
	this.renderChart = function (containerId, team) {
		var bar_chart_container_width= $(".chart_container").width(),
			names = _.map(team, function (player) {
				return player.name;
			}),
			points = _.map(team, function (player) {

				return player.point_sum;
			}),

			data = {
				labels: names,
				datasets: [
					{
						fillColor: "rgba(220,220,220,0.5)",
						strokeColor: "rgba(220,220,220,1)",
						data: points
					}
				]
			},
			$canvas = $(containerId),
			ctx = $canvas.get(0).getContext("2d"), chart;
		$canvas.attr("width", bar_chart_container_width);
		$canvas.attr("height", "400");

		this.clearCanvas($canvas);
		chart = new Chart(ctx);

		chart.Bar(data, this.getDefaultOptions());
	};

	this.clearCanvas = function ($canvas) {
		var ctx = $canvas.get(0).getContext("2d");

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		ctx.restore();
	};

	/**
	 * Return default options for rendering this chart
	 */
	this.getDefaultOptions = function () {
		return options = {
			//Boolean - If we show the scale above the chart data
			scaleOverlay: false,

			//Boolean - If we want to override with a hard coded scale
			scaleOverride: false,

			//** Required if scaleOverride is true **
			//Number - The number of steps in a hard coded scale
			scaleSteps: null,
			//Number - The value jump in the hard coded scale
			scaleStepWidth: null,
			//Number - The scale starting value
			scaleStartValue: null,

			//String - Colour of the scale line
			scaleLineColor: "rgba(0,0,0,.1)",

			//Number - Pixel width of the scale line
			scaleLineWidth: 1,

			//Boolean - Whether to show labels on the scale
			scaleShowLabels: true,

			//Interpolated JS string - can access value
			scaleLabel: "<%=value%>",

			//String - Scale label font declaration for the scale label
			scaleFontFamily: "'Arial'",

			//Number - Scale label font size in pixels
			scaleFontSize: 14,

			//String - Scale label font weight style
			scaleFontStyle: "normal",

			//String - Scale label font colour
			scaleFontColor: "#666",

			///Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - If there is a stroke on each bar
			barShowStroke: true,

			//Number - Pixel width of the bar stroke
			barStrokeWidth: 2,

			//Number - Spacing between each of the X value sets
			barValueSpacing: 5,

			//Number - Spacing between data sets within X values
			barDatasetSpacing: 1,

			//Boolean - Whether to animate the chart
			animation: true,

			//Number - Number of animation steps
			animationSteps: 60,

			//String - Animation easing effect
			animationEasing: "easeOutQuart",

			//Function - Fires when the animation is complete
			onAnimationComplete: null
		};
	}
};