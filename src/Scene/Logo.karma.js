import Game from "Game";
// import Menu from "Scene/Menu";
// import StartMenu from "Scene/StartMenu";
import * as PIXI from "pixi.js";

PIXI.Loader.shared.add("blocks", "assets/sprites.json");
PIXI.Loader.shared.add("decor", "assets/decorsprites.json");
// import recurseSearch from "test/util/recurseSearch";

describe("Scene/Logo.karma.js", () => {
	let container;
	let game;
	// const getByTestingId = id => {
	// 	return recurseSearch(id, game.engine.stage);
	// };

	beforeAll(function () {
		// FLOWHACK
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;
		container = document.createElement("div");

		// FLOWHACK
		document.body.appendChild(container);
		game = new Game(container);
	});
	afterAll(function () {
		game.destroy();

		// FLOWHACK
		document.body.removeChild(container);
	});
	//
	describe("boot", () => {
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 2000);
		});
		it("should be inited", () => {
			expect(game.inited).toBe(true);
		});
		// it("should open menu scene", done => {
		// 	game.engine.startScene(new Menu());
		// 	setTimeout(done, 1000);
		// });
	});
	describe("Splash Screen", () => {
		it("should trigger logo-over", done => {
			window.addEventListener("logo-over", done);
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
	});
});
