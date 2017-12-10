import Game from "Game";

describe("Game", () => {
	it("should be defined", () => {
		expect(Game).toBeDefined();
		// expect(Game.default).toBeDefined();
		// expect(Game.Engine).toBeDefined();
	});
	it("destroys", () => {
		let div = document.createElement("DIV");
		let game = new Game(div);
		expect(div.childNodes.length).toBeGreaterThan(0);
		game.destroy();
		expect(div.childNodes.length).toBe(0);
	});
});
