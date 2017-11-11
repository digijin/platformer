import Game from "Game";

describe("functional", () => {
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
		container = document.createElement("div");
		container.style =
			"position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%";
		document.body.appendChild(container);
		game = new Game(container);
	});
	afterAll(function() {
		game.destroy();
		document.body.removeChild(container);
	});
	describe("boot", () => {
		it("shouldnt throw any errors in the first second", done => {
			setTimeout(done, 1000);
		});
	});
});
