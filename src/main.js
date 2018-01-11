import Game from "Game";

//electron
// try {
// 	const { BrowserWindow } = require("electron");
// 	console.log(BrowserWindow);
// } catch (err) {
// 	console.log("not electron");
// }

window.onload = () => {
	window.game = new Game(document.getElementById("container"));
};
