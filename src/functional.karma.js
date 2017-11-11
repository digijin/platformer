// @flow
import Game from "Game";

import mouseUtil from "test/util/mouse";
// let Game = require("./Game");
// let mouseUtil = require("./test/util/mouse");

describe("functional", () => {
	let container;
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
	describe("start game", () => {
		it("should press play", () => {
			expect(document.getElementById("play")).toBeDefined();
			mouseUtil.clickSelector("#play");
		});
		it("shouldnt throw any errors in the first second", done => {
			setTimeout(done, 1000);
		});
	});
	describe("weapons check", () => {
		it("should aim", () => {
			let target = {
				clientX: window.innerWidth / 2 + 100,
				clientY: window.innerHeight / 2 - 100
			};
			mouseUtil.mouseEvent("mousemove", target);
			expect(game.engine.input.mouse.position.x).toBe(target.clientX);
		});
		it("should begin firing", () => {
			mouseUtil.mouseEvent("mousedown", { button: 0 });
			expect(game.engine.input.getButton("fire")).toBe(1);
		});
		it("should fire for a while", done => {
			setTimeout(done, 1000);
		});
		it("should end firing", () => {
			mouseUtil.mouseEvent("mouseup", { button: 0 });
		});
		it("should wait for a while", done => {
			setTimeout(done, 1000);
		});
		it("should start firing misiles", () => {
			mouseUtil.mouseEvent("mousedown", { button: 2 });
		});
		it("should wait for a while", done => {
			setTimeout(done, 1000);
		});
		it("should end firing misiles", () => {
			mouseUtil.mouseEvent("mouseup", { button: 2 });
		});
		it("should wait for a while", done => {
			setTimeout(done, 1000);
		});
	});
});
