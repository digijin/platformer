var spritesheet = require("spritesheet-js");

spritesheet(
	"src/assets/explosion/*.png",
	{ format: "pixi.js", path: "dist", trim: true },
	function(err) {
		// console.log(err);
		if (err) throw err;

		console.log("spritesheet successfully generated");
	}
);
