/* global Module */

/* Magic Mirror
 * Module: transport
 *
 * By qubelka
 * MIT Licensed.
 */


Module.register("mmm-transport", {
	defaults: {
		updateInterval: 15000,
        userId: null,
        transportInfo: {
			stopNumber: null,
			arrivalTimes: []
		},
	},
	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},
    getTemplate: function () {
		return "transport.njk";
	},
	getTemplateData: function () {
		var self = this;
		return {
			config: this.config
		};
	},
	getData: function() {
        var self = this;
		urlApi = `https://mmm-transport-mock0900.ghf789.repl.co/person/${this.config.userId}`
		var dataRequest = new XMLHttpRequest();
		dataRequest.open("GET", urlApi, true);
		dataRequest.onreadystatechange = function () {
			console.log(this.readyState);
			if (this.readyState === 4) {
				console.log(this.status);
				if (this.status === 200) {
					self.processData(JSON.parse(this.response));
				} else if (this.status === 400) {
					Log.error(self.name, "Unrecognized user.");
				} else {
					Log.error(self.name, "Could not load data.");
				}
			}
		};
		dataRequest.send();
	},
	processData: function(data) {
		var self = this;
		this.dataRequest = data;
        if (this.dataRequest) {
			this.config.transportInfo.stopNumber = this.config.userId
			this.config.transportInfo.arrivalTimes = []
			this.dataRequest.arrivalTimes.forEach(e => {
				let arrivalTime = new Date(e.scheduledArrival * 1000).toISOString().slice(11, 16)
				this.config.transportInfo.arrivalTimes.push({ scheduledArrival: arrivalTime, busNumber: e.busNumber })
			})
		}
		this.updateDom();
	},
	socketNotificationReceived: function (notification, payload) {
        var self = this;
		switch (notification) {
			case "PERSON_RECOGNIZED": 
				console.log("Notification:", notification);
				this.config.userId = payload.personId;
				this.getData();
				break;
			case "PERSON_DISMISSED":
				this.config.userId = null;
				this.updateDom();
				break;
			default: {
				console.log("Notification:", notification);
			}
		}
	},
});