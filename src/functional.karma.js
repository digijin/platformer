//@flow
import Game from "Game";

import testGen from "jasmine-es6-generator";
import mouseUtil from "test/util/mouse";

import ReactTestUtils from "react-dom/test-utils";
import sizzle from "sizzle";
// let Game = require("./Game");
// let mouseUtil = require("./test/util/mouse");

// const tg: (Generator<*,*,*>)=>null = testGen
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe("functional", () => {
	let container;
	let game;
	beforeAll(function() {
		// FLOWHACK
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 1000;
		container = document.createElement("div");
		// container.style =
		// 	"position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%; z-index:10000";

		// FLOWHACK
		document.body.appendChild(container);
		game = new Game(container);
		// mouseUtil.setCanvas(container.childNodes[0]);
	});
	afterAll(function() {
		game.destroy();

		// FLOWHACK
		document.body.removeChild(container);
	});
	describe("boot", () => {
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
		it("should have a canvas", () => {
			expect(container.childNodes.length).toBeGreaterThan(1);
			expect(container.childNodes[0].constructor.name).toBe(
				"HTMLCanvasElement"
			);
		});
		it("should have a ui div", () => {
			expect(container.childNodes[1].id).toBe("ui");
		});
	});
	describe("wait out splash", () => {
		it("should trigger logo-over", done => {
			window.addEventListener("logo-over", done);
		});
		it("should trigger menu-ready", done => {
			window.addEventListener("menu-ready", done);
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
	});

	describe("start game", () => {
		it("null should be undefined", () => {
			expect(null).toBeDefined();
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 2000);
		});
		it("should press load", () => {
			let loadButton = document.getElementById("loadButton");
			expect(loadButton).not.toBe(null);
			mouseUtil.clickSelector("#loadButton");
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
		it("should type in text box", () => {
			let characterName = document.getElementById("characterName");
			expect(characterName).not.toBe(null);
			characterName.value = "test_profile";
			ReactTestUtils.Simulate.change(characterName);
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
		it("sohuld click add", () => {
			let newProfile = document.getElementById("newProfile");
			expect(newProfile).not.toBe(null);
			mouseUtil.clickSelector("#newProfile");
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
		it("should click the newly added profile", () => {
			let profileButton = document.getElementById("profiletest_profile");
			expect(profileButton).not.toBe(null);
			mouseUtil.clickSelector("#profiletest_profile");
		});
		it("should trigger transition-finished", done => {
			window.addEventListener("transition-finished", done);
		});
	});

	describe("briefing screen", () => {
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 2000);
		});
		it("should click through to equip", () => {
			let equipButton = document.getElementById("equipButton");
			expect(equipButton).not.toBe(null);
			mouseUtil.clickSelector("#equipButton");
		});
		it("should trigger transition-finished", done => {
			window.addEventListener("transition-finished", done);
		});
	});
	describe("equip screen", () => {
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 1000);
		});
		it("should click through to launch", () => {
			let launchButton = document.getElementById("launchButton");
			expect(launchButton).not.toBe(null);
			mouseUtil.clickSelector("#launchButton");
		});
	});

	describe("weapons check", () => {
		it("should aim", () => {
			let target = {
				clientX: window.innerWidth / 2 + 200,
				clientY: window.innerHeight / 2 - 200
			};
			mouseUtil.mouseEvent("mousemove", target, game.engine.canvas);
			expect(game.engine.input.mouse.position.x).toBe(target.clientX);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 0 },
				game.engine.canvas
			);
			expect(game.engine.input.getButton("fire")).toBe(1);
		});
		it(
			"should move cursor",
			testGen(function*() {
				for (let i = 0; i < 100; i++) {
					let target = {
						clientX: window.innerWidth / 2 + 200,
						clientY: window.innerHeight / 2 - 200 + i * 2
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
		it("should have bullets in the air", () => {
			expect(game.engine.objectsTagged("bullet").length).toBeGreaterThan(
				0
			);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent("mouseup", { button: 0 }, game.engine.canvas);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should start firing misiles", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 2 },
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should have missiles in flight", () => {
			expect(game.engine.objectsTagged("missile").length).toBeGreaterThan(
				0
			);
		});
		it("should end firing misiles", () => {
			mouseUtil.mouseEvent("mouseup", { button: 2 }, game.engine.canvas);
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
			let target = {
				clientX: window.innerWidth / 2 - 200,
				clientY: window.innerHeight / 2 + 200
			};
			mouseUtil.mouseEvent("mousemove", target, game.engine.canvas);
			expect(game.engine.input.mouse.position.x).toBe(target.clientX);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 2 },
				game.engine.canvas
			);
		});

		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent("mouseup", { button: 2 }, game.engine.canvas);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 0 },
				game.engine.canvas
			);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent("mouseup", { button: 0 }, game.engine.canvas);
		});
		it("should wait for a while", done => {
			setTimeout(done, 100);
		});
	});
});
