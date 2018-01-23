// import Game from "Game";

//electron
// try {
// 	const { BrowserWindow } = require("electron");
// 	console.log(BrowserWindow);
// } catch (err) {
// 	console.log("not electron");
// }

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

PIXI.loader.add("blocks", "assets/sprites.json");

window.onload = () => {
	//load more shit
	// console.log("window loaded");
	PIXI.loader.load(() => {
		// console.log("pixi loaded n shit");
		// load pixi assets before we even parse Game
		// so that any references to pixi can be referenced as they are parsed
		// and not have init checks and shit everywhere
		let Game = require("Game").default;
		window.game = new Game(document.getElementById("container"));
	});
};
