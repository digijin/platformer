import Point from "./Point";
import Line from "./Line";

describe("Utility/Line", () => {
	describe("constructor", () => {
		it("should take two Points, a and b", () => {
			let pta = new Point({ x: 1, y: 2 });
			let ptb = new Point({ x: 3, y: 4 });
			let line = new Line({ a: pta, b: ptb });
			expect(line.a).toBe(pta);
			expect(line.b).toBe(ptb);
		});
	});
	describe("length", () => {
		it("sohuld return distance between two poiunts", () => {
			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 3, y: 4 });

			let line = new Line({ a: pta, b: ptb });
			expect(line.length()).toBe(5);
		});
	});
	describe("direction", () => {
		it("sohuld return radiams looking from a to b", () => {
			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 3, y: 3 });

			let line = new Line({ a: pta, b: ptb });
			expect(line.direction()).toBe(-3 * Math.PI / 4);
		});
	});
	describe("percent", () => {
		it("should return midpoint", () => {
			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 2, y: 4 });
			let line = new Line({ a: pta, b: ptb });
			let mid = line.percent(0.5);
			expect(mid.x).toBe(1);
			expect(mid.y).toBe(2);
		});
	});
});
