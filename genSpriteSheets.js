var fs = require("fs");
var spritesheet = require("spritesheet-js");

fs.readdirSync("src/assets/animation").forEach(dir => {
	// console.log(dir);
	var options = {
		format: "pixi.js",
		path: "dist",
		trim: true,
		name: dir
	};

	spritesheet("src/assets/animation/" + dir + "/*.png", options, function(
		err
	) {
		if (err) throw err;
	});
});
