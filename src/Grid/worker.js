self.addEventListener(
	"message",
	function(e) {
		var data = e.data;
		switch (data.action) {
			case "repeat":
				self.postMessage("did you say " + data);
				break;
			default:
				self.postMessage({ error: "action required" });
		}
	},
	false
);
