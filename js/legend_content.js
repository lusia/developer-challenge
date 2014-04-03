/**
 * Add content to the legend in html
 * @param name of player
 * @param color to display
 * @constructor
 */

var LegendContent = function (name, color) {
	$(".js-legend").show();
	var text = text + "<tr><td style='background-color: "  + color  + "'" + "></td>" + "<td>" + name + "</td></tr>"
	$(".js-legend_to_graph").append(text)
};