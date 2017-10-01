import Point from "Point";

import config from "config";

describe("Point", () => {
	beforeEach(() => {});

	describe("distanceTo", () => {
		it("should calc", () => {
			let from = new Point({ x: 0, y: 0 });
			let to = new Point({ x: 3, y: 4 });
			expect(from.distanceTo(to)).toBe(5);
		});
	});
	describe("move", () => {
		it("should move", () => {
			let from = new Point({ x: 0, y: 0 });
			let to = from.move(0, 10);
			expect(to.x).toBe(10);
			expect(to.y).toBe(0);
		});
	});

	describe("stringify", () => {
		it("shuold stringify without functions", () => {
			let p = new Point({ x: 1, y: 2 });
			let str = JSON.stringify(p);
			expect(str).toBe('{"x":1,"y":2}');
		});
	});
});
