import Point from "./Point";
import Line from "./Line";
import Rect from "./Rect";

describe("Utility/Line", () => {
	describe("constructor", () => {
		it("should take two Points, a and b", () => {
			const pta = new Point({ x: 1, y: 2 });
			const ptb = new Point({ x: 3, y: 4 });
			const line = new Line({ a: pta, b: ptb });
			expect(line.a).toBe(pta);
			expect(line.b).toBe(ptb);
		});
	});
	describe("length", () => {
		it("sohuld return distance between two poiunts", () => {
			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 3, y: 4 });

			const line = new Line({ a: pta, b: ptb });
			expect(line.length()).toBe(5);
		});
	});
	describe("direction", () => {
		it("sohuld return radiams looking from a to b", () => {
			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 3, y: 3 });

			const line = new Line({ a: pta, b: ptb });
			expect(line.direction()).toBe(-3 * Math.PI / 4);
		});
	});
	describe("percent", () => {
		it("should return midpoint", () => {
			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 2, y: 4 });
			const line = new Line({ a: pta, b: ptb });
			const mid = line.percent(0.5);
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

			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 2, y: 4 });
			const line = new Line({ a: pta, b: ptb });
			const rect = new Rect({ t: 0, r: 5, b: 2, l: 3 });
			expect(line.intersectsRect(rect).result).toBe(false);
		});
		it("hits", () => {
			// +012345
			// 0a ***
			// 1  * *
			// 2  ***
			// 3    b
			// 4
			// 5

			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 4, y: 3 });
			const line = new Line({ a: pta, b: ptb });
			const rect = new Rect({ t: 0, r: 4, b: 2, l: 2 });
			expect(line.intersectsRect(rect).result).toBe(true);
		});
	});
	describe("digijinPixels", () => {
		describe("calcMB", () => {
			it("should calc mb", () => {
				//http://www.purplemath.com/modules/strtlneq.htm
				const line = new Line({
					a: new Point({ x: -2, y: 4 }),
					b: new Point({ x: 1, y: 2 }),
				});
				const accuracy = 100;
				const { m, b } = line.calcMB();
				expect(Math.floor(m * accuracy)).toBe(
					Math.floor(-2 / 3 * accuracy)
				);
				expect(Math.floor(b * accuracy)).toBe(
					Math.floor(8 / 3 * accuracy)
				);
			});
		});
		const testcases = [
			// { a: [1, 1], b: [2, 3], p: [[1, 1], [1, 2]] },
			{
				t: "horizontal",
				a: [1.5, 1.5],
				b: [4.5, 1.5],
				p: [[1, 1], [2, 1], [3, 1], [4, 1]],
			},
			{
				t: "vertical",
				a: [1.5, 1.5],
				b: [1.5, 4.5],
				p: [[1, 1], [1, 2], [1, 3], [1, 4]],
			},
			{
				t: "slanted",
				a: [1.5, 1.5],
				b: [2.5, 3.5],
				p: [[1, 1], [1, 2], [2, 2], [2, 3]],
			},
			{
				t: "diagonal",

				a: [1.5, 1.5],
				b: [3.5, 3.5],
				p: [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3]],
			},
		];
		testcases.forEach((tc, i) => {
			it("should test case " + tc.t, () => {
				const pta = new Point({ x: tc.a[0], y: tc.a[1] });
				const ptb = new Point({ x: tc.b[0], y: tc.b[1] });
				const line = new Line({ a: pta, b: ptb });
				const pixels = line.digijinPixels();
				expect(pixels.length).toBe(tc.p.length);
				tc.p.forEach((p, j) => {
					expect(pixels[j].x).toBe(p[0]);
					expect(pixels[j].y).toBe(p[1]);
				});
			});
		});
	});
	describe("bresenham", () => {
		it("returns an array of points", () => {
			const pta = new Point({ x: 0, y: 0 });
			const ptb = new Point({ x: 3, y: 2 });
			const line = new Line({ a: pta, b: ptb });
			const bresenham = line.bresenham();
			// console.log(pixels);
			expect(bresenham.length).toBe(7);
		});
		it("handles floating points", () => {
			const pta = new Point({ x: 10, y: 10 });
			const ptb = new Point({
				x: 29.900000000000002,
				y: 27.650000000000002,
			});
			const line = new Line({ a: pta, b: ptb });
			const bresenham = line.bresenham();
			// console.log(pixels);
			expect(bresenham.length).toBe(38);
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
