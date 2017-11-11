import Game from "Game";

describe("functional", () => {
	let container;
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
		container = document.createElement("div");
		// container.style =
		// 	"position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%; z-index:10000";
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
		it("should have a canvas", () => {
			expect(container.childNodes.length).toBe(2);
			expect(container.childNodes[0].constructor.name).toBe(
				"HTMLCanvasElement"
			);
		});
		it("should have a ui div", () => {
			expect(container.childNodes[1].id).toBe("ui");
		});
	});
});
