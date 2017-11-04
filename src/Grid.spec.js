import Grid from "Grid";
import config from "config";
import Point from "Point";
import Block from "Block";

describe("Grid", () => {
	it("should be a class", () => {
		new Grid();
	});
	describe("constructor", () => {
		it("should init an array full of blocks", () => {
			let grid = new Grid({ w: 3, h: 4 });
			// debugger;
			// let block = grid.getBlock({ x: 0, y: 0 });
			// expect(grid.blocks.length).toBe(3);
			expect(grid.grid.length).toBe(3);
			expect(grid.grid[0].length).toBe(4);
		});
	});
	describe("getBlock", () => {
		it("should return a block if in range", () => {
			let grid = new Grid({ w: 3, h: 3 });
			let block = grid.getBlock({ x: 0, y: 0 });
			expect(block).toBe(grid.grid[0][0]);
		});
	});
	describe("getBlockAtPoint", () => {});
	describe("blocksInRect", () => {
		it("should return", () => {
			config.grid.width = 20;
			config.grid.height = 20;

			let grid = new Grid();

			grid.blocks = [[new Block({ position: { x: 0, y: 0 } })], [], []];
		});
	});
});
