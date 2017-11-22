// @flow
import Game from "Game";

import testGen from "jasmine-es6-generator";
import mouseUtil from "test/util/mouse";
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
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
		container = document.createElement("div");
		// container.style =
		// 	"position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%; z-index:10000";
		document.body.appendChild(container);
		game = new Game(container);
		mouseUtil.setCanvas(container.childNodes[0]);
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
	describe("add tiles", () => {
		let pt = { x: 200, y: 200 };
		it("should add tiles under cursor", done => {
			mouseUtil.mouseEvent("mousemove", { clientX: pt.x, clientY: pt.y });
			mouseUtil.mouseEvent("mousedown", { button: 0 });
			setTimeout(() => {
				expect(game.engine.grid.getBlockAtPoint(pt).isEmpty()).toBe(
					true
				);
				mouseUtil.mouseEvent("mouseup", { button: 0 });
				done();
			}, 100);
		});
		it("should remove tiles under cursor", done => {
			mouseUtil.mouseEvent("mousemove", { clientX: pt.x, clientY: pt.y });
			mouseUtil.mouseEvent("mousedown", { button: 2 });
			setTimeout(() => {
				expect(game.engine.grid.getBlockAtPoint(pt).isEmpty()).toBe(
					false
				);
				mouseUtil.mouseEvent("mouseup", { button: 2 });
				done();
			}, 100);
		});
	});
});
