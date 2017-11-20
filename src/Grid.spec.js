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
			let filled = grid.getBlocksFlattened().filter(b => !b.isEmpty());
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
	describe("save and load", () => {
		describe("load", () => {
			it("should have load", () => {
				let grid = new Grid({ w: 10, h: 10 });

				expect(grid.load).toBeDefined();
			});
			it("should restore the original grid size", () => {
				let gridA = new Grid({ w: 10, h: 10 });
				let gridB = new Grid({ w: 5, h: 5 });
				gridB.load(gridA.save());
				expect(gridB.blocks.length).toBe(gridA.blocks.length);
			});
		});
		// it("should stringify", () => {
		// 	let grid = new Grid({ w: 2, h: 2 });
		// 	expect(JSON.stringify(grid.getBlocksFlattened())).toBe(
		// 		'[{"position":{"x":0,"y":0},"type":"0"},{"position":{"x":0,"y":1},"type":"0"},{"position":{"x":1,"y":0},"type":"0"},{"position":{"x":1,"y":1},"type":"0"}]'
		// 	);
		// });
		it("should restore block settings", () => {
			let gridA = new Grid({ w: 5, h: 5 });
			let gridB = new Grid({ w: 5, h: 5 });
			expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
			gridA.getBlock({ x: 2, y: 2 }).add();
			expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);

			expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
			gridB.load(gridA.save());
			expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);
		});
	});
	describe("integration", () => {
		it("should let blocks destroy", () => {
			let grid = new Grid({ w: 10, h: 10 });
			let block = grid.getBlockAtPoint({ x: 0, y: 0 });
			expect(block).toBeDefined();
			expect(block.destroy).toBeDefined();
			block.type = "1";
			block.destroy();
			expect(block.isEmpty()).toBe(true);
		});
	});
	describe("caching tile renderer", () => {
		it("tiles in rect", () => {
			let grid = new Grid({ w: 10, h: 10 });
			config.grid.tile.width = 4;
			config.grid.tile.height = 4;
			let tiles = grid.tilesInRect(
				new Rect({ t: -10, r: 10, b: 10, l: -10 })
			);
			expect(tiles.length).toBe(4);
			expect(tiles[0].x).toBe(-1);
			expect(tiles[0].y).toBe(-1);
			expect(tiles[3].x).toBe(0);
			expect(tiles[3].y).toBe(0);
		});
	});
});
