//@flow

import Grid from "Grid";

describe("Grid.test.js jest only", () => {
	describe("save", () => {
		it("should return a strugn from save", () => {
			const grid = new Grid({ size: { w: 10, h: 10 } });
			expect(typeof grid.save()).toBe("string");
		});
		it("save snapshot", () => {
			const grid = new Grid({ size: { w: 2, h: 2 } });
			// FLOWHACK
			expect(grid.save()).toMatchSnapshot();
		});
	});
});
