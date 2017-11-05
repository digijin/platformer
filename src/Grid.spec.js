import Grid from "Grid";
import config from "config";
import Point from "Point";
import Block from "Block";
import Rect from "Rect";

describe("Grid", () => {
	it("should be a class", () => {
		new Grid();
	});
	describe("generate", () => {
		it("should modify blocks", () => {
			let grid = new Grid();
			grid.generate(1);
			let filled = grid.blocksFlattened().filter(b => !b.isEmpty());
			expect(filled.length).toBeGreaterThan(0);
		});
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
			block = grid.getBlockAtPoint({ x: 25, y: 25 });
			expect(block.position.x).toBe(2);
			expect(block.position.y).toBe(2);
		});
	});
	describe("getBlocksInRect", () => {
		describe("should return", () => {
			let grid, rect, blocks;

			beforeEach(() => {
				config.grid.width = 10;
				config.grid.height = 10;

				grid = new Grid({ w: 10, h: 10 });
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
	describe("getBlocksOverlappingRect", () => {
		describe("should return", () => {
			let grid, rect, blocks;

			beforeEach(() => {
				config.grid.width = 10;
				config.grid.height = 10;

				grid = new Grid({ w: 10, h: 10 });
				rect = new Rect({ t: 15, r: 35, b: 35, l: 15 });
				blocks = grid.getBlocksOverlappingRect(rect);
			});
			it("should return array", () => {
				expect(Array.isArray(blocks)).toBe(true);
			});
			it("should have right number of elements", () => {
				expect(blocks.length).toBe(9);
			});
			it("sohuld have correct elements", () => {
				expect(blocks[0].position.x).toBe(1);
				expect(blocks[0].position.y).toBe(1);

				expect(blocks[8].position.x).toBe(3);
				expect(blocks[8].position.y).toBe(3);
			});
		});
	});
});
