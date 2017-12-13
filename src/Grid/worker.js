self.addEventListener(
	"message",
	function(e) {
		var data = e.data;
		switch (data.action) {
			case "availability":
				self.postMessage("available");
				break;
			case "repeat":
				self.postMessage("did you say " + data.data);
				break;
			default:
				self.postMessage({ error: "action required" });
		}
	},
	false
);
