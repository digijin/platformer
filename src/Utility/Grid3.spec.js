
import Grid3 from "./Grid3";

class Obj {
	constructor() {
		this.id = "myId";
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
});