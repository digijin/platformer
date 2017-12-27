import Point from "./Point";
import Line from "./Line";
import Rect from "./Rect";

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

	describe("intersectsRect", () => {
		it("misses", () => {
			// +012345
			// 0a  ***
			// 1   * *
			// 2   ***
			// 3
			// 4  b
			// 5

			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 2, y: 4 });
			let line = new Line({ a: pta, b: ptb });
			let rect = new Rect({ t: 0, r: 5, b: 2, l: 3 });
			expect(line.intersectsRect(rect)).toBe(false);
		});
		it("hits", () => {
			// +012345
			// 0a ***
			// 1  * *
			// 2  ***
			// 3    b
			// 4
			// 5

			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 4, y: 3 });
			let line = new Line({ a: pta, b: ptb });
			let rect = new Rect({ t: 0, r: 4, b: 2, l: 2 });
			expect(line.intersectsRect(rect)).toBe(true);
		});
	});
	describe("pixels", () => {
		it("returns an array of points", () => {
			let pta = new Point({ x: 0, y: 0 });
			let ptb = new Point({ x: 3, y: 2 });
			let line = new Line({ a: pta, b: ptb });
			let pixels = line.pixels();
			// console.log(pixels);
			expect(pixels.length).toBe(7);
		});
		it("handles floating points", () => {
			let pta = new Point({ x: 10, y: 10 });
			let ptb = new Point({
				x: 29.900000000000002,
				y: 27.650000000000002
			});
			let line = new Line({ a: pta, b: ptb });
			let pixels = line.pixels();
			// console.log(pixels);
			expect(pixels.length).toBe(38);
		});
	});
	describe("multiply", () => {
		describe("shuld multiply", () => {
			let pta, ptb, line;
			beforeEach(() => {
				pta = new Point({ x: 1, y: 2 });
				ptb = new Point({ x: 3, y: 4 });
				line = new Line({ a: pta, b: ptb });
				line = line.multiply(2);
			});
			describe("a", () => {
				it(" x", () => {
					expect(line.a.x).toBe(2);
				});
				it(" y", () => {
					expect(line.a.y).toBe(4);
				});
			});
			describe("b", () => {
				it(" x", () => {
					expect(line.b.x).toBe(6);
				});
				it(" y", () => {
					expect(line.b.y).toBe(8);
				});
			});
		});
	});
});
