
import Grid3 from "./Grid3";
import Grid from "../Grid";

class Obj {
	constructor(params) {
		this.id = "myId";
		Object.assign(this, params);
	}
}

describe("Utility/Grid3", () => {
	it("shoule be an array", () => {
		expect(Array.isArray(new Grid3())).toBe(true);
	});
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
});