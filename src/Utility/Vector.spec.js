import Vector from "Utility/Vector";

describe("Utility/Vector", () => {
	describe("dot", () => {
		it("should return 0 on right angle", () => {
			expect(new Vector(0, 1, 0).dot(new Vector(1, 0, 0))).toBe(0);
		});
		it("opposite vectors", () => {
			expect(new Vector(0, 1, 0).dot(new Vector(0, -1, 0))).toBe(-1);
		});
		it("returns length squared whene dotted with itself", () => {
			const vec = new Vector(0, 3, 0);
			expect(vec.dot(vec)).toBe(3 * 3);
		});
	});

	describe("cross", () => {
		it("sohuld return z from x cross y", () => {
			const x = new Vector(1, 0, 0);
			const y = new Vector(0, 1, 0);
			const cross = x.cross(y);
			expect(cross.z).toBe(1);
		});
	});
});
