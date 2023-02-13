/* Magic Mirror
 * Node Helper: transport
 *
 * By qubelka
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	socketNotificationReceived: function(notification, payload) {
		if (notification === "transport-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			this.sendNotificationTest(this.anotherFunction());
		}
	},

	sendNotificationTest: function(payload) {
		this.sendSocketNotification("transport-NOTIFICATION_TEST", payload);
	},
});