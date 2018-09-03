import Grid from "Grid";
import config from "config";
import Point from "Utility/Point";
// import Block from "Level/Grid/Block";
import Rect from "Utility/Rect";

import { DecorTypes } from "Level/Grid/Decor/Type";

describe("Grid.spec.js", () => {
	it("should be a class", () => {
		new Grid();
	});
	describe("addEnemyData", () => {
		let grid;
		beforeEach(() => {
			grid = new Grid({ size: { w: 2, h: 2 } });
		});
		it("should add to some list", () => {
			grid.addEnemyData({ position: new Point(), type: { id: "1" } });
			expect(grid.enemyData.length).toBe(1);
		});
		it("should turn up in save", () => {
			grid.addEnemyData({ position: new Point(), type: { id: "1" } });
			const data = JSON.parse(grid.save());
			expect(data.enemies.length).toBe(1);
		});
	});
	describe("decor", () => {
		let grid;
		beforeEach(() => {
			grid = new Grid();
		});
		it("decor", () => {
			expect(grid.decor.length).toBe(0);
		});
		it("addDecor", () => {
			grid.addDecor(new Point(), DecorTypes[0].id);
			expect(grid.decor.length).toBe(1);
		});
		//for some reason this one test causes `Failed to execute 'postMessage'`
		//https://github.com/apollographql/apollo-client/issues/1871
		xit("getDecor", () => {
			const type = DecorTypes[0].id;
			const point = new Point();
			grid.addDecor(point, type);
			const decor = grid.getDecor(point);
			expect(decor.constructor.name).toBe("Decor");
		});
		it("removeDecor", () => {
			grid.addDecor(new Point(), DecorTypes[0].id);
			expect(grid.decor.length).toBe(1);
			grid.removeDecor(new Point());
			expect(grid.decor.length).toBe(0);
		});
	});
	// describe("generate", () => {
	// 	it("should modify blocks", () => {
	// 		const grid = new Grid();
	// 		grid.generate(1);
	// 		const filled = grid.getBlocksFlattened().filter(b => !b.isEmpty());
	// 		expect(filled.length).toBeGreaterThan(0);
	// 	});
	// });
	describe("constructor", () => {
		it("should init an array full of blocks", () => {
			const grid = new Grid({ size: { w: 3, h: 4 } });
			// debugger;
			// let block = grid.getBlock({ x: 0, y: 0 });
			// expect(grid.blocks.length).toBe(3);
			expect(grid.blocks.length).toBe(3);
			expect(grid.blocks[0].length).toBe(4);
		});
	});
	describe("blocks", () => {
		xit("should be a 2d array after initialisation", () => {
			//broke after grid3
			const grid = new Grid();
			expect(Array.isArray(grid.blocks)).toBe(true);
			// expect(Array.isArray(grid.blocks[0])).toBe(true);
		});
	});
	describe("getBlock", () => {
		it("should return a block if in range", () => {
			const grid = new Grid({ size: { w: 3, h: 3 } });
			const block = grid.getBlock({ x: 0, y: 0 });
			expect(block).toBe(grid.blocks[0][0][0]);
		});
	});
	describe("getBlockAtPoint", () => {
		it("should get using config", () => {
			config.grid.width = 10;
			const grid = new Grid({ size: { w: 5, h: 5 } });
			let block = grid.getBlockAtPoint({ x: 15, y: 15 });
			expect(block.position.x).toBe(1);
			expect(block.position.y).toBe(1);
			block = grid.getBlockAtPoint({ x: 25, y: 25 });
			expect(block.position.x).toBe(2);
			expect(block.position.y).toBe(2);
		});
	});
	describe("getBlocksOverlappingRect", () => {
		describe("should return", () => {
			let grid, rect, blocks;

			beforeEach(() => {
				config.grid.width = 10;

				grid = new Grid({ size: { w: 10, h: 10 } });
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
				const grid = new Grid({ size: { w: 10, h: 10 } });

				expect(grid.load).toBeDefined();
			});
			it("should restore the original grid size", () => {
				const gridA = new Grid({ size: { w: 10, h: 10 } });
				const gridB = new Grid({ size: { w: 5, h: 5 } });
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
			const gridA = new Grid({ size: { w: 5, h: 5 } });
			const gridB = new Grid({ size: { w: 5, h: 5 } });
			expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
			gridA.getBlock({ x: 2, y: 2 }).add("2");
			expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);

			gridA.addDecor(new Point(), "1");
			expect(gridA.getDecor(new Point()).type).toBe("1");

			expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
			const savedata = gridA.save();
			gridB.load(savedata);
			expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);
			expect(gridB.getDecor(new Point()).type).toBe("1");
		});
	});
	describe("integration", () => {
		it("should set itself on blocks", () => {
			const grid = new Grid({ size: { w: 10, h: 10 } });
			const block = grid.getBlock({ x: 0, y: 0 });
			expect(block.grid).toBeDefined();
		});
		describe("destroy", () => {
			let grid;
			let block;
			beforeEach(() => {
				grid = new Grid({ size: { w: 10, h: 10 } });
				block = grid.getBlock({ x: 0, y: 0 });
			});
			it("block defined", () => {
				expect(block).toBeDefined();
			});
			it("destroy defined", () => {
				expect(block.destroy).toBeDefined();
			});
			it("block grid defined", () => {
				expect(block.grid).toBeDefined();
			});
			it("should let blocks destroy", () => {
				block.type = "1";
				block.destroy();
				expect(block.isEmpty()).toBe(true);
			});
		});
	});

	xdescribe("addRow", () => {
		it("should add above", () => {
			const grid = new Grid({ size: { w: 2, h: 2 } });
			grid.addRowAbove();
			expect(grid.height).toBe(3);
			expect(grid.blocks[0].length).toBe(3);
		});
		it("should add below", () => {
			const grid = new Grid({ size: { w: 2, h: 2 } });
			grid.addRowBelow();
			expect(grid.height).toBe(3);
			expect(grid.blocks[0].length).toBe(3);
		});
	});


});
