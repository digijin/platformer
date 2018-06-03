// import Game from "Game";

//electron
// try {
// 	const { BrowserWindow } = require("electron");
// 	console.log(BrowserWindow);
// } catch (err) {
// 	console.log("not electron");
// }

import fontloader from "webfontloader";

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

PIXI.loader.add("blocks", "assets/sprites.json");
PIXI.loader.add("decor", "assets/decorsprites.json");
fontloader.load({
	google: {
		families: ["Roboto"],
		// urls: ["/assets/Roboto-Regular.ttf", "/assets/Roboto-Bold.ttf"],
		loading: function() {
			console.log("loading");
		},
		active: function() {
			console.log("active");
		},
		inactive: function() {
			console.log("inactive");
		},
		fontloading: function(familyName, fvd) {
			console.log("fontloading");
		},
		fontactive: function(familyName, fvd) {
			console.log("fontactive");
		},
		fontinactive: function(familyName, fvd) {
			console.log("fontinactive");
		}
	}
});

window.onload = () => {
	//load more shit
	// console.log("window loaded");
	PIXI.loader.add("/assets/Roboto-Regular.ttf");
	PIXI.loader.add("/assets/Roboto-Bold.ttf");
	PIXI.loader.load(() => {
		// console.log("pixi loaded n shit");
		// load pixi assets before we even parse Game
		// so that any references to pixi can be referenced as they are parsed
		// and not have init checks and shit everywhere
		// console.log("beep", new Date().getTime());

		setTimeout(() => {
			// console.log("boop", new Date().getTime());
			let Game = require("Game").default;
			window.game = new Game(document.getElementById("container"));
		}, 1);
	});
};
