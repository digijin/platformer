import Rect from "Rect";
import Point from "Point";

describe("Rect", () => {
	describe("fromPosSizeRego", () => {
		it("should work", () => {
			let pos = { x: 100, y: 200 };
			let size = { w: 50, h: 50 };
			let rego = { x: 0.5, y: 1 };
			let output = Rect.fromPosSizeRego(pos, size, rego);
			expect(output.t).toBe(150);
			expect(output.r).toBe(125);
			expect(output.b).toBe(200);
			expect(output.l).toBe(75);
		});
	});
	describe("overlaps", () => {
		it("true case", () => {
			let r1 = new Rect({ t: 0, r: 10, b: 10, l: 0 });
			let r2 = new Rect({ t: 5, r: 15, b: 15, l: 5 });
			expect(r1.overlaps(r2)).toBe(true);
		});
		it("false case", () => {
			let r1 = new Rect({ t: 0, r: 10, b: 10, l: 0 });
			let r2 = new Rect({ t: 15, r: 25, b: 25, l: 15 });
			expect(r1.overlaps(r2)).toBe(false);
		});
	});
	describe("contains", () => {
		let rect;
		beforeEach(() => {
			rect = new Rect({ t: 0, r: 10, b: 10, l: 0 });
		});
		it("true case", () => {
			expect(rect.contains(new Point({ x: 5, y: 5 }))).toBe(true);
		});

		it("above", () => {
			expect(rect.contains(new Point({ x: 5, y: -5 }))).toBe(false);
		});
		it("below", () => {
			expect(rect.contains(new Point({ x: 5, y: 15 }))).toBe(false);
		});
		it("left", () => {
			expect(rect.contains(new Point({ x: -5, y: 5 }))).toBe(false);
		});
		it("right", () => {
			expect(rect.contains(new Point({ x: 15, y: 5 }))).toBe(false);
		});
	});

	describe("move", () => {
		let rect;
		beforeEach(() => {
			rect = new Rect({ t: 0, r: 10, b: 10, l: 0 });
		});
		it("should move all values", () => {
			rect = rect.move({ x: 1, y: 2 });
			expect(rect.t).toBe(2);
			expect(rect.r).toBe(11);
			expect(rect.b).toBe(12);
			expect(rect.l).toBe(1);
		});
	});
});
