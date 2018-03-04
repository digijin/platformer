self.addEventListener(
	"message",
	function(e) {
		var data = e.data;
		switch (data.action) {
		case "availability":
			self.postMessage("available");
			break;
		case "repeat":
			self.postMessage(data.data);
			break;
		case "renderTile":
			break;

		default:
			self.postMessage({ error: "action required" });
		}
	},
	false
);
