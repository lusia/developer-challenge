/**
 * Sum all points for per user, used to display bar chart
 */
var PointsCollector = {
	/**
	 * Sum points per user
	 * @param team - array of players
	 *
	 * @return - nothing, passed object is modified and returned by reference
	 */
	count: function (team) {

		_.each(team, function (player) {
			player.point_sum = _.reduce(player.points, function (memo, point) {
				return memo + point.amount;
			}, 0);
		});
	}
};