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
});
