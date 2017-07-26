import Rect from "Rect";

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
});
