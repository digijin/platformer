// var i = 0;

// var timedCount = function() {
// 	i = i + 1;
// 	postMessage(i, "*");
// 	setTimeout(function() {
// 		postMessage(3, "*");
// 	}, 500);
// };

// timedCount();

console.log("worker initializing");

// onmessage = function(e) {
// 	console.log("Message received from main script");
// 	var workerResult = "Result: " + e.data;
// 	console.log("Posting message back to main script");
// 	postMessage(workerResult);
// };
// self.addEventListener(
// 	"message",
// 	function(e) {
// 		console.log("self.addEventListener heard message");
// 		self.postMessage(e.data);
// 	},
// 	false
// );

self.addEventListener(
	"message",
	function(e) {
		var data = e.data;
		switch (data.cmd) {
			case "start":
				self.postMessage("WORKER STARTED: " + data.msg);
				break;
			case "stop":
				self.postMessage(
					"WORKER STOPPED: " +
						data.msg +
						". (buttons will no longer work)"
				);
				self.close(); // Terminates the worker.
				break;
			default:
				self.postMessage("Unknown command: " + data.msg);
		}
	},
	false
);
