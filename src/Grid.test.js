import Grid from "Grid";

describe("grid jest", () => {
	it("should return a strugn from save", () => {
		let grid = new Grid({ w: 10, h: 10 });

		expect(typeof grid.save()).toBe("string");
	});
});
