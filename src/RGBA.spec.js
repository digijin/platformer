import RGBA from "RGBA";

describe("RGBA", () => {
	it("should be a class with r g b a", () => {
		let rgba = new RGBA({ r: 0.1, g: 0.2, b: 0.3, a: 0.4 });
		expect(rgba.r).toBe(0.1);
		expect(rgba.g).toBe(0.2);
		expect(rgba.b).toBe(0.3);
		expect(rgba.a).toBe(0.4);
	});
});
