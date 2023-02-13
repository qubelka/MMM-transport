/* global Module */

/* Magic Mirror
 * Module: transport
 *
 * By qubelka
 * MIT Licensed.
 */


Module.register("transport", {
	defaults: {
		updateInterval: 15000,
		retryDelay: 5000,
        transportData: {
            stop1: {
                name: "Stop 1",
                arrivalTimes: [
                    {
                        busNumber: 123,
                        scheduledArrival: 32400
                    },
                    {
                        busNumber: 232,
                        scheduledArrival: 36000
                    },
                    {
                        busNumber: 123,
                        scheduledArrival: 39600
                    },
                    {
                        busNumber: 232,
                        scheduledArrival: 43200
                    }
                ]
            },
            stop2: {
                name: "Stop 2",
                arrivalTimes: [
                    {
                        busNumber: 654,
                        scheduledArrival: 32400
                    },
                    {   
                        busNumber: 123,
                        scheduledArrival: 34200
                    },
                    {
                        busNumber: 654,
                        scheduledArrival: 36000
                    },
                    {
                        busNumber: 123,
                        scheduledArrival: 37800
                    }
                ]
            },
            stop3: {
                name: "Stop 3",
                arrivalTimes: [
                    {
                        busNumber: 556,
                        scheduledArrival: 32400
                    },
                    {
                        busNumber: 123,
                        scheduledArrival: 33300
                    },
                    {
                        busNumber: 556,
                        scheduledArrival: 34200
                    },
                    {
                        busNumber: 123,
                        scheduledArrival: 35100
                    }
                ]
            },
            stop4: {
                stop4: "Stop 4",
                arrivalTimes: [
                    {
                        busNumber: 245,
                        scheduledArrival: 32400
                    },
                    {
                        busNumber: 245,
                        scheduledArrival: 33000
                    },
                    {
                        busNumber: 245,
                        scheduledArrival: 33600
                    },
                    {
                        busNumber: 245,
                        scheduledArrival: 34200
                    }
                ]
            }
        },
        userId: null
	},

	requiresVersion: "2.1.0", 

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		this.loaded = false;

		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getData: function() {
		var self = this;
        randomUser = Math.floor(Math.random()*4) + 1
        this.config.userId = randomUser
        self.processData(self.config.transportData[`stop${randomUser}`]);
	},

	getDom: function() {
		var self = this;

		var wrapper = document.createElement("div");

		if (this.dataRequest) {
			var wrapperDataRequest = document.createElement("div");

            this.dataRequest.arrivalTimes.forEach(e => {
                let arrivalTime = new Date(e.scheduledArrival * 1000).toISOString().slice(11,16)
                wrapperDataRequest.appendChild(document.createTextNode(`Bus ${e.busNumber} arrives at ${arrivalTime}`));
                wrapperDataRequest.appendChild(document.createElement("BR"));
            })

			wrapper.appendChild(wrapperDataRequest);
		}

		if (this.dataNotification) {
			var wrapperDataNotification = document.createElement("div");
			wrapper.appendChild(wrapperDataNotification);
		}
		return wrapper;
	},

	processData: function(data) {
        Log.log("Inside processData")
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
		this.sendSocketNotification("transport-NOTIFICATION_TEST", data);
	},

	socketNotificationReceived: function (notification, payload) {
		if(notification === "transport-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},

	getHeader: function () {
		return this.config.userId ? this.data.header + ` for stop ${this.config.userId}` : this.data.header;
	},
});