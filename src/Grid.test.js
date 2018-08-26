//@flow

import Grid from "Grid";
import config from "config";
import Rect from "Utility/Rect";

describe("getBlocksInRect", () => {
	describe("should return", () => {
		let grid, rect, blocks;

		beforeEach(() => {
			config.grid.width = 10;

			grid = new Grid({ size: { w: 10, h: 10 } });
			rect = new Rect({ t: 15, r: 45, b: 45, l: 15 });
			blocks = grid.getBlocksInRect(rect);
		});
		it("should return array", () => {
			expect(Array.isArray(blocks)).toBe(true);
		});
		it("should have right number of elements", () => {
			expect(blocks.length).toBe(4);
		});
		it("sohuld have correct elements", () => {
			expect(blocks[0].position.x).toBe(2);
			expect(blocks[0].position.y).toBe(2);

			expect(blocks[3].position.x).toBe(3);
			expect(blocks[3].position.y).toBe(3);
		});
	});
});
describe("Grid.test.js jest only", () => {
	describe("save", () => {
		it("should return a strugn from save", () => {
			const grid = new Grid({ size: { w: 10, h: 10 } });
			expect(typeof grid.save()).toBe("string");
		});
		it("save snapshot", () => {
			const grid = new Grid({ size: { w: 2, h: 2 } });
			// FLOWHACK
			expect(grid.save()).toMatchSnapshot();
		});
	});
});
