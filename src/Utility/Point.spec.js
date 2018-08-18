import Point from "./Point";

import config from "config";

describe("Utility/Point.spec.js", () => {
	beforeEach(() => {});

	describe("distanceTo", () => {
		it("should calc", () => {
			const from = new Point({ x: 0, y: 0 });
			const to = new Point({ x: 3, y: 4 });
			expect(from.distanceTo(to)).toBe(5);
		});
	});
	describe("move", () => {
		it("should move", () => {
			const from = new Point({ x: 0, y: 0 });
			const to = from.move(0, 10);
			expect(to.x).toBe(10);
			expect(to.y).toBe(0);
		});
	});

	describe("stringify", () => {
		it("shuold stringify without functions", () => {
			const p = new Point({ x: 1, y: 2 });
			const str = JSON.stringify(p);
			expect(str).toBe("{\"x\":1,\"y\":2}");
		});
	});
	describe("easeTo", () => {
		it("should error if no divisor", () => {
			const from = new Point({ x: 0, y: 0 });
			const to = new Point({ x: 2, y: 1 });
			expect(() => {
				from.easeTo(to);
			}).toThrow();
		});
		it("should ease", () => {
			const from = new Point({ x: 0, y: 0 });
			const to = new Point({ x: 2, y: 1 });
			const eased = from.easeTo(to, 2);
			expect(eased.x).toBe(1);
			expect(eased.y).toBe(0.5);
		});
	});
	describe("rounded", () => {
		it("shuold return xy rounded", () => {
			const rounded = new Point({ x: 0.7, y: 2.3 }).rounded;
			expect(rounded.x).toBe(1);
			expect(rounded.y).toBe(2);
		});
	});
	describe("getblock", () => {
		it("shuold return xy ", () => {
			// set config grid size
			const rounded = new Point({ x: 12, y: 43 }).getBlock();
			expect(rounded.x).toBe(0);
			expect(rounded.y).toBe(1);
		});
	});
	describe("percentTo", () => {
		it("should return midpoint of two points", () => {
			const point1 = new Point({ x: 1, y: 1 });
			const point2 = new Point({ x: 5, y: 5 });
			const mid = point1.percentTo(point2, 0.5);
			expect(mid.x).toBe(3);
			expect(mid.y).toBe(3);
		});
		it("should return quarter of two points", () => {
			const point1 = new Point({ x: 1, y: 1 });
			const point2 = new Point({ x: 5, y: 5 });
			const mid = point1.percentTo(point2, 0.25);
			expect(mid.x).toBe(2);
			expect(mid.y).toBe(2);
		});
	});
});
