var ColorCreator = {

	/**
	 * Create random color, hopefully they differ  to distinct player on the chart

	 * @returns array - color in rgba format
	 */
	create: function () {
		var r = Math.round(Math.random() * 255),
			g = Math.round(Math.random() * 255),
			b = Math.round(Math.random() * 255);

		return [r, g, b, 0.2];
	}
};