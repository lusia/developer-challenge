/**
 * Main applicaton
 */
var App = {
	team: null,
	run: function () {
		var that = this;
		$.getJSON('data/actions.json', function (data) {
			var bar = new BarChart(),
				line = new LineChart();

			// @type array
			that.team = TeamParser.parse(data);
			PointsCollector.count(that.team);
			setTimeout(function () {
				bar.renderChart('#bar-chart', that.team);
			}, 1000);

			$("#team-summary").on("click", "input[type='checkbox']", function () {
				var players_to_display = [];
				if ($(this).attr('id') === 'players-mark-all') {
					$(".checkbox").prop('checked', $(this).is(':checked'));
				}

				$(".checkbox:checked").each(function (index, input) {
					players_to_display.push(input.getAttribute('value'));
				});

				line.renderChart('#linechart_with_results', _.filter(that.team, function (player) {
					return (players_to_display.indexOf(player.player_id) > -1);
				}));
			});

			TeamTable.render('#team-summary', that.team);
			$("#team-summary").on("click", ".js-table-order", function () {

				var $this = $(this), team,
					sortkey = $this.attr('data-sort-key').split('|')[0],
					reverse = $this.attr('data-sort-key').split('|')[1] === 'down';

				team = _.sortBy(that.team, function (player) {
					return player[sortkey];
				});

				if (reverse === true) {
					team = team.reverse();
				}

				TeamTable.render('#team-summary', team);
			});
		});
	}
};