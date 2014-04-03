var XlabelGenerator = {
	/**
	 * Create label with all minutes
	 * @param max minute in the game
	 */
	create: function (max) {
		var i, xlabel = [];

		max = Math.max(90, max);

		for (i = 0; i <= max; i++) {
			if (i % 10 === 0) {
				xlabel.push(i);
			} else {
				xlabel.push('');
			}
		}
		xlabel[max] = max;

		return xlabel;
	}
};