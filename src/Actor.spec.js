import Actor from "Actor";
import Point from "Utility/Point";
import Grid from "Grid";
import config from "config";

if (jest) {
	jest.mock("pixi.js");
}

describe("Actor", () => {
	let actor: Actor;
	let grid: Grid;
	beforeEach(() => {
		config.grid.width = 10;
		actor = new Actor();
		actor.position = new Point({ x: 20, y: 40 });
		actor.size = { w: 20, h: 20 };
		actor.registration = { x: 0.5, y: 1 };
		grid = new Grid().fromTestStrings([
			"000001",
			"000000",
			"000000",
			"000011",
			"111111"
		]);
		actor.init({ grid });
	});
	describe("canmovehori", () => {
		it("should return true if there's space", () => {
			expect(actor.canMoveHori(5)).toBe(true);
		});
		it("should return false if there's no space", () => {
			expect(actor.canMoveHori(15)).toBe(false);
		});
	});
	describe("canstep", () => {
		it("should return false when not moving", () => {
			expect(actor.canStep(0)).toBe(false);
		});
		it("should return false if there's no step", () => {
			expect(actor.canStep(5)).toBe(false);
		});
		it("should return true if there's a step", () => {
			expect(actor.canStep(15)).toBe(true);
		});
	});
});
