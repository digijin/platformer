//electron
// try {
// 	const { BrowserWindow } = require("electron");
// 	console.log(BrowserWindow);
// } catch (err) {
// 	console.log("not electron");
// }

import * as PIXI from "pixi.js";

// PIXI.utils.skipHello();

const loader = PIXI.Loader.shared;

loader.add("blocks", "assets/sprites.json");
loader.add("decor", "assets/decorsprites.json");
/**
 * Bootstrap file
 * responsible for preloading everything and kicking off Game
 */

window.onload = () => {
	//load more shit
	// console.log("window loaded");

	loader.load(() => {
		// console.log("pixi loaded n shit");
		// load pixi assets before we even parse Game
		// so that any references to pixi can be referenced as they are parsed
		// and not have init checks and shit everywhere

		setTimeout(() => {
			const Game = require("Game").default;
			window.game = new Game(document.getElementById("container"));
		}, 1);
	});
};
