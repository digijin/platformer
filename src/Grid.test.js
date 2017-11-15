//@flow

import Grid from "Grid";

describe("grid jest", () => {
	describe("save", () => {
		it("should return a strugn from save", () => {
			let grid = new Grid({ w: 10, h: 10 });

			expect(typeof grid.save()).toBe("string");
		});
		it("save snapshot", () => {
			let grid = new Grid({ w: 10, h: 10 });
			expect(grid.save()).toMatchSnapshot();
		});
	});
});
