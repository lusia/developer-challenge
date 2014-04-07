LineChart = function () {

	/**
	 * Render chart
	 * @param array players
	 */
	this.renderChart = function (containerId, players) {
		var that = this,
			width_line_chart_container = $(".line_chart_container").width(),
			max_minute = this.findLastMinute(players),
			xlabel = XlabelGenerator.create(max_minute),
			$canvas = $(containerId),
			ctx = $canvas.get(0).getContext("2d"),
			chart,
			data = {labels: xlabel};

		$canvas.attr('width', width_line_chart_container);
		$canvas.attr('height', "400");

		chart = new Chart(ctx);
		data.datasets = _.map(players, function (player) {
			return that.getDatasetForPlayer(player, max_minute);
		});


		this.clearCanvas($canvas);
		chart.Line(data, this.getDefaultOptions());
		this.generateChartLegend(players);

	};

	this.generateChartLegend = function (players) {
		var $legend = $('#graph_legend'), source, template, $table;

		if (players.length === 0) {
			$legend.hide();
		} else {
			$legend.show();
			source = $('#template-chart-legend').html(),
				template = Handlebars.compile(source);

			$table = $legend.find('table');
			$table.find('tr:gt(0)').remove();
			$table.find('tr:eq(0)').after(template({players: players}));
		}
	},

	/**
	 * @param player - player object, contains points array
	 * @param match_duration - last/current minute of the game
	 */
		this.getDatasetForPlayer = function (player, match_duration) {
			var formatColorToRGBAString = function (r, g, b, a) {
					return color = _.str.sprintf('rgba(%d, %d, %d, %f)', r, g, b, a);
				},
				yvalues = [], i, points_sum = 0,
				r = player.chart_color[0],
				g = player.chart_color[1],
				b = player.chart_color[2],
				a = player.chart_color[3];

			for (i = 0; i <= match_duration; i++) {
				yvalues.push(0);
			}
			_.each(player.points, function (point) {
				yvalues[point.minutes] = yvalues[point.minutes] + point.amount;
			});

			return {
				fillColor: formatColorToRGBAString(r, g, b, a),
				strokeColor: formatColorToRGBAString(r, g, b, 1),
				pointColor: formatColorToRGBAString(r, g, b, 0),
				pointStrokeColor: formatColorToRGBAString(r, g, b, 0),
				data: yvalues
			};
		},

	/**
	 * Clear drawing area
	 * @param $canvas
	 */
		this.clearCanvas = function ($canvas) {
			var ctx = $canvas.get(0).getContext("2d");

			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, $canvas.width, $canvas.height);
			ctx.restore();
		};

	/**
	 * Find last minute when any player gets points
	 * @param players
	 *
	 * @returns int minutes
	 */
	this.findLastMinute = function (players) {
		var all_points = _.map(players, function (player) {
			return player.points;
		});
		all_points = _.flatten(all_points);

		return _.max(all_points,function (point) {
			return point.minutes;
		}).minutes;
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
			scaleFontSize: 12,

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

			//Boolean - Whether the line is curved between points
			bezierCurve: true,

			//Boolean - Whether to show a dot for each point
			pointDot: true,

			//Number - Radius of each point dot in pixels
			pointDotRadius: 3,

			//Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			//Boolean - Whether to show a stroke for datasets
			datasetStroke: true,

			//Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			//Boolean - Whether to fill the dataset with a colour
			datasetFill: true,

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
