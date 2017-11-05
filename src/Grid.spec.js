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
			expect(grid.blocks.length).toBe(3);
			expect(grid.blocks[0].length).toBe(4);
		});
	});
	describe("blocks", () => {
		it("should be a 2d array after initialisation", () => {
			let grid = new Grid();
			expect(Array.isArray(grid.blocks)).toBe(true);
			expect(Array.isArray(grid.blocks[0])).toBe(true);
		});
	});
	describe("getBlock", () => {
		it("should return a block if in range", () => {
			let grid = new Grid({ w: 3, h: 3 });
			let block = grid.getBlock({ x: 0, y: 0 });
			expect(block).toBe(grid.blocks[0][0]);
		});
	});
	describe("getBlockAtPoint", () => {
		it("should get using config", () => {
			config.grid.width = 10;
			config.grid.height = 10;
			let grid = new Grid({ w: 5, h: 5 });
			let block = grid.getBlockAtPoint({ x: 15, y: 15 });
			expect(block.position.x).toBe(1);
			expect(block.position.y).toBe(1);
		});
	});
	describe("blocksInRect", () => {
		it("should return", () => {
			config.grid.width = 20;
			config.grid.height = 20;

			let grid = new Grid();

			grid.blocks = [[new Block({ position: { x: 0, y: 0 } })], [], []];
		});
	});
});
