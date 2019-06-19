import Game from "Game";
import Level from "Scene/Level";

import * as PIXI from "pixi.js";
PIXI.loader.add("blocks", "assets/sprites.json");
PIXI.loader.add("decor", "assets/decorsprites.json");
// import recurseSearch from "test/util/recurseSearch";
import Promise from "promise";
import testGen from "jasmine-es6-generator";
import mouseUtil from "test/util/mouse";

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function clickId(id) {
	const button = document.getElementById(id);
	expect(button).not.toBe(null);
	mouseUtil.clickSelector("#" + id);
}

describe("Scene/Level.karma.js", () => {
	let container;
	let game;
	// const getByTestingId = id => {
	// 	return recurseSearch(id, game.engine.stage);
	// };

	beforeAll(function() {
		// FLOWHACK
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;
		container = document.createElement("div");
		// FLOWHACK
		document.body.appendChild(container);
		game = new Game(container);
	});
	afterAll(function() {
		game.destroy();
		// FLOWHACK
		document.body.removeChild(container);
	});

	describe("boot", () => {
		it("shouldnt throw any errors initializing", done => {
			window.addEventListener("logo-start", done);
		});
		it("should be inited", () => {
			expect(game.inited).toBe(true);
		});
		it("should open Level scene", done => {
			window.addEventListener("level-start", done);
			game.engine.startScene(new Level());
			// setTimeout(done, 1000);
		});
	});

	describe("weapons check", () => {
		it("should aim", () => {
			const target = {
				clientX: window.innerWidth / 2 + 200,
				clientY: window.innerHeight / 2 - 200,
			};
			mouseUtil.mouseEvent("mousemove", target, game.engine.canvas);
			expect(game.engine.input.mouse.position.x).toBe(target.clientX);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{
					button: 0,
				},
				game.engine.canvas
			);
			expect(game.engine.input.getButton("fire")).toBe(1);
		});
		it(
			"should move cursor",
			testGen(function*() {
				for (let i = 0; i < 50; i++) {
					const target = {
						clientX: window.innerWidth / 2 + 200,
						clientY: window.innerHeight / 2 - 300 + i * 4,
					};
					mouseUtil.mouseEvent(
						"mousemove",
						target,
						game.engine.canvas
					);
					expect(game.engine.input.mouse.position.y).toBe(
						target.clientY
					);
					yield sleep(10);
				}
			})
		);
		xit("should have bullets in the air", () => {
			expect(game.engine.objectsTagged("bullet").length).toBeGreaterThan(
				0
			);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent(
				"mouseup",
				{
					button: 0,
				},
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should start firing misiles", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{
					button: 2,
				},
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		xit("should have missiles in flight", () => {
			expect(game.engine.objectsTagged("missile").length).toBeGreaterThan(
				0
			);
		});
		it("should end firing misiles", () => {
			mouseUtil.mouseEvent(
				"mouseup",
				{
					button: 2,
				},
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
	});
	describe("run and gun", () => {
		it("should start running", () => {
			window.onkeydown({ keyCode: 68 }); //39
			// expect(game.engine.input.getAxis("horizontal")).toBe(1);
		});
		it("should wait for a while", done => {
			setTimeout(done, 500);
		});
		it("should start jumping", () => {
			window.onkeydown({ keyCode: 32 });
			expect(game.engine.input.getButton("jump")).toBe(1);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should stop jumping", () => {
			window.onkeyup({ keyCode: 32 });
			expect(game.engine.input.getButton("jump")).toBe(0);
		});

		it("should aim", () => {
			const target = {
				clientX: window.innerWidth / 2 - 200,
				clientY: window.innerHeight / 2 + 200,
			};
			mouseUtil.mouseEvent("mousemove", target, game.engine.canvas);
			expect(game.engine.input.mouse.position.x).toBe(target.clientX);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{
					button: 2,
				},
				game.engine.canvas
			);
		});

		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent(
				"mouseup",
				{
					button: 2,
				},
				game.engine.canvas
			);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{
					button: 0,
				},
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent(
				"mouseup",
				{
					button: 0,
				},
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
	});

	describe("pause and exit to menu", () => {
		it("should hit escape", () => {
			window.onkeydown({ keyCode: 27 }); //39
			window.onkeyup({ keyCode: 27 }); //39
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should be paused", () => {
			expect(game.engine.paused).toBe(true);
		});
		it("should resume", () => {
			clickId("resumeButton");
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should not be paused", () => {
			expect(game.engine.paused).toBe(false);
		});
		it("should hit escape", () => {
			window.onkeydown({ keyCode: 27 });
			window.onkeyup({ keyCode: 27 });
		});
		//took out just because of circleCI
		// it("should be registered with input", () => {
		// 	expect(game.engine.input.getKeyDown("escape")).toBeTruthy();
		// });
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should be paused for a second time", () => {
			expect(game.engine.paused).toBe(true);
		});
		it("should click main menu", () => {
			clickId("mainMenuButton");
		});
	});
});
