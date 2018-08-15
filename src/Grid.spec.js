import Grid from "Grid";
import config from "config";
import Point from "Utility/Point";
import Block from "Level/Grid/Block";
import Rect from "Utility/Rect";

import { DecorTypes } from "Level/Grid/Decor/Type";

describe("Grid.spec.js", () => {
    it("should be a class", () => {
        new Grid();
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
            let type = DecorTypes[0].id;
            let point = new Point();
            grid.addDecor(point, type);
            let decor = grid.getDecor(point);
            expect(decor.constructor.name).toBe("Decor");
        });
        it("removeDecor", () => {
            grid.addDecor(new Point(), DecorTypes[0].id);
            expect(grid.decor.length).toBe(1);
            grid.removeDecor(new Point());
            expect(grid.decor.length).toBe(0);
        });
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
            let grid = new Grid({ size: { w: 3, h: 4 } });
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
            let grid = new Grid({ size: { w: 3, h: 3 } });
            let block = grid.getBlock({ x: 0, y: 0 });
            expect(block).toBe(grid.blocks[0][0]);
        });
    });
    describe("getBlockAtPoint", () => {
        it("should get using config", () => {
            config.grid.width = 10;
            let grid = new Grid({ size: { w: 5, h: 5 } });
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
                let grid = new Grid({ size: { w: 10, h: 10 } });

                expect(grid.load).toBeDefined();
            });
            it("should restore the original grid size", () => {
                let gridA = new Grid({ size: { w: 10, h: 10 } });
                let gridB = new Grid({ size: { w: 5, h: 5 } });
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
            let gridA = new Grid({ size: { w: 5, h: 5 } });
            let gridB = new Grid({ size: { w: 5, h: 5 } });
            expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
            gridA.getBlock({ x: 2, y: 2 }).add("2");
            expect(gridA.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);

            gridA.addDecor(new Point(), "1");
            expect(gridA.getDecor(new Point()).type).toBe("1");

            expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(true);
            let savedata = gridA.save();
            gridB.load(savedata);
            expect(gridB.getBlock({ x: 2, y: 2 }).isEmpty()).toBe(false);
            expect(gridB.getDecor(new Point()).type).toBe("1");
        });
    });
    describe("integration", () => {
        it("should set itself on blocks", () => {
            let grid = new Grid({ size: { w: 10, h: 10 } });
            let block = grid.getBlock({ x: 0, y: 0 });
            expect(block.grid).toBeDefined();
        });
        it("should let blocks destroy", () => {
            let grid = new Grid({ size: { w: 10, h: 10 } });
            let block = grid.getBlock({ x: 0, y: 0 });
            expect(block).toBeDefined();
            expect(block.destroy).toBeDefined();
            expect(block.grid).toBeDefined();
            block.type = "1";
            block.destroy();
            expect(block.isEmpty()).toBe(true);
        });
    });

    describe("addRow", () => {
        it("should add above", () => {
            let grid = new Grid({ size: { w: 2, h: 2 } });
            grid.addRowAbove();
            expect(grid.height).toBe(3);
            expect(grid.blocks[0].length).toBe(3);
        });
        it("should add below", () => {
            let grid = new Grid({ size: { w: 2, h: 2 } });
            grid.addRowBelow();
            expect(grid.height).toBe(3);
            expect(grid.blocks[0].length).toBe(3);
        });
    });
});
