import Rect from "./Rect";
import Point from "./Point";

describe("Utility/Rect", () => {
	describe("fromXYWH", () => {
		it("should work", () => {
			const rect = Rect.fromXYWH({ x: 10, y: 20, w: 30, h: 40 });
			expect(rect.t).toBe(20);
			expect(rect.r).toBe(40);
			expect(rect.b).toBe(60);
			expect(rect.l).toBe(10);
		});
	});
	describe("fromPosSizeRego", () => {
		it("should work", () => {
			const pos = { x: 100, y: 200 };
			const size = { w: 50, h: 50 };
			const rego = { x: 0.5, y: 1 };
			const output = Rect.fromPosSizeRego(pos, size, rego);
			expect(output.t).toBe(150);
			expect(output.r).toBe(125);
			expect(output.b).toBe(200);
			expect(output.l).toBe(75);
		});
	});
	describe("fromSprite", () => {
		it("should work", () => {
			const sprite = {
				position: {
					x: 10,
					y: 20,
				},
				width: 30,
				height: 40,
			};
			const output = Rect.fromSprite(sprite);
			expect(output.t).toBe(20);
			expect(output.r).toBe(40);
			expect(output.b).toBe(60);
			expect(output.l).toBe(10);
		});
	});
	describe("overlaps", () => {
		it("true case", () => {
			const r1 = new Rect({ t: 0, r: 10, b: 10, l: 0 });
			const r2 = new Rect({ t: 5, r: 15, b: 15, l: 5 });
			expect(r1.overlaps(r2)).toBe(true);
		});
		it("false case", () => {
			const r1 = new Rect({ t: 0, r: 10, b: 10, l: 0 });
			const r2 = new Rect({ t: 15, r: 25, b: 25, l: 15 });
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
