import Grid from "Grid";
import config from "config";
import Point from "Point";
import Block from "Block";

describe("Grid", () => {
	describe("blocksInRect", () => {
		it("should return", () => {
			config.grid.width = 20;
			config.grid.height = 20;

			let grid = new Grid();

			grid.blocks = [[new Block({ position: { x: 0, y: 0 } })], [], []];
		});
	});
});
