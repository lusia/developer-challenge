var TeamParser = {
	/**
	 * Parse incoming data and return team array
	 * team is an array with player objects {name, player_id, points}
	 */
	parse: function (data) {
		var team, tmp = _.groupBy(data, function (action) {
			return action.player_id;
		});

		/**
		 * @param actions - array of action
		 * @id player id
		 */
		team = _.map(tmp, function (actions, id) {
			var points = _.map(actions, function (action) {

				return {minutes: action.minutes,
					amount: action.total_points};
			});

			return {player_id: id,
				chart_color : ColorCreator.create(),//rgba format
				name: actions[0].player_name, //at least one action must exist
				points: points}
		});

		return team;
	}
};


