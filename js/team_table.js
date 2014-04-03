var TeamTable = {

	templateId : '#template-team-summary',

	/**
	 * Render team table, attach all necessary events
	 * @param team
	 */
	render : function (containerId, team) {
		var source   = $(this.templateId).html(),
		template = Handlebars.compile(source);

		$(containerId).html(template({team : team}));
	}

}