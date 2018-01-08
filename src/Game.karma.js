import Game from "Game";
import { setTimeout } from "timers";

describe("Game", () => {
	it("should be defined", () => {
		expect(Game).toBeDefined();
		// expect(Game.default).toBeDefined();
		// expect(Game.Engine).toBeDefined();
	});
	// it("destroys", done => {
	// 	let div = document.createElement("DIV");
	// 	let game = new Game(div);
	// 	setTimeout(() => {
	// 		//wait for assets to load
	// 		expect(div.childNodes.length).toBeGreaterThan(0);
	// 		game.destroy();
	// 		expect(div.childNodes.length).toBe(0);

	// 		done();
	// 	}, 1000);
	// });
});
