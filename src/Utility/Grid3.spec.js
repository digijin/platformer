
import Grid3 from "./Grid3";
import { Grid } from "material-ui";

class Obj {
	constructor(params) {
		this.id = "myId";
		Object.assign(this, params);
	}
}

describe("Utility/Grid3", () => {
	// it("shoule be an array", () => {
	// 	expect(Array.isArray(new Grid3())).toBe(true);
	// });
	describe("constructor", () => {
		it("width", () => {
			const grid = new Grid3(3, 1, 1, Obj);
			expect(grid[2][0][0]).toBeDefined();
		});
		it("height", () => {
			const grid = new Grid3(1, 3, 1, Obj);
			expect(grid[0][2][0]).toBeDefined();
		});
		it("depth", () => {
			const grid = new Grid3(1, 1, 3, Obj);
			expect(grid[0][0][2]).toBeDefined();
		});
	});
	it("should put right things in right places", () => {
		const grid = new Grid3(5, 5, 5, Obj);
		expect(grid[1][2][3].x).toBe(1);
		expect(grid[1][2][3].y).toBe(2);
		expect(grid[1][2][3].z).toBe(3);
	});
	describe("size", () => {
		let grid;
		beforeEach(() => {
			grid = new Grid3(3, 4, 5, Obj);
		});
		it("should have width", () => {
			expect(grid.width).toBe(3);
		});
		it("should have height", () => {
			expect(grid.height).toBe(4);
		});
		it("should have depth", () => {
			expect(grid.depth).toBe(5);
		});
	});

	describe("params", () => {
		it("should be applied", () => {
			const grid = new Grid3(1, 1, 1, Obj, { test: "val" });
			expect(grid[0][0][0].test).toBe("val");
		});
	});
	describe("raw", () => {
		let grid;
		beforeEach(() => {
			grid = new Grid3(2, 3, 4, Obj);
		});
		it("should return an array", () => {
			expect(Array.isArray(grid.raw())).toBe(true);
		});
		it("should return a 2d array", () => {
			expect(Array.isArray(grid.raw()[0])).toBe(true);
		});
		it("should return a 3d array", () => {
			expect(Array.isArray(grid.raw()[0][0])).toBe(true);
		});
	});
});