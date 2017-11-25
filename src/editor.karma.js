import Game from "Game";

import testGen from "jasmine-es6-generator";
import mouseUtil from "test/util/mouse";
// let Game = require("./Game");
// let mouseUtil = require("./test/util/mouse");

// const tg: (Generator<*,*,*>)=>null = testGen
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe("editor functional", () => {
	let container;
	let game;
	beforeAll(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
		container = document.createElement("div");
		// container.style =
		// 	"position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%; z-index:10000";
		document.body.appendChild(container);
		game = new Game(container);
		// mouseUtil.setCanvas(container.childNodes[0]);
	});
	afterAll(function() {
		game.destroy();
		document.body.removeChild(container);
	});
	describe("boot", () => {
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
	});
	describe("start editor", () => {
		it("should press editor", () => {
			expect(document.getElementById("editor")).toBeDefined();
			mouseUtil.clickSelector("#editor");
		});
		it("shouldnt throw any errors initializing", done => {
			setTimeout(done, 100);
		});
	});
	describe("input", () => {
		it("shuold target canvas", () => {
			expect(game.engine.input.mouse.target).toBe(game.engine.canvas);
		});
		it("should hear stuff", () => {
			expect(game.engine.input.getMouseButton(0)).toBe(0);
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 0 },
				game.engine.canvas
			);
			expect(game.engine.input.getMouseButton(0)).toBe(1);
			mouseUtil.mouseEvent("mouseup", { button: 0 }, game.engine.canvas);
			expect(game.engine.input.getMouseButton(0)).toBe(0);
		});
	});
	describe("add tiles", () => {
		let pt = { x: 500, y: 500 };
		it("should add tiles under cursor", done => {
			mouseUtil.mouseEvent(
				"mousemove",
				{ clientX: pt.x, clientY: pt.y },
				game.engine.canvas
			);
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 0 },
				game.engine.canvas
			);
			setTimeout(() => {
				let block = game.engine.grid.getBlockAtPoint(
					game.engine.mouse.point
				);
				expect(block.isEmpty()).toBe(false);
				mouseUtil.mouseEvent(
					"mouseup",
					{ button: 0 },
					game.engine.canvas
				);
				done();
			}, 100);
		});
		it("should remove tiles under cursor", done => {
			mouseUtil.mouseEvent(
				"mousemove",
				{ clientX: pt.x, clientY: pt.y },
				game.canvas
			);
			mouseUtil.mouseEvent(
				"mousedown",
				{ button: 2 },
				game.engine.canvas
			);
			setTimeout(() => {
				let block = game.engine.grid.getBlockAtPoint(
					game.engine.mouse.point
				);
				expect(block.isEmpty()).toBe(true);
				mouseUtil.mouseEvent(
					"mouseup",
					{ button: 2 },
					game.engine.canvas
				);
				done();
			}, 100);
		});
	});
});
