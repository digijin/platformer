import RGBA from "RGBA";

describe("RGBA", () => {
	it("should be a class with r g b a", () => {
		let rgba = new RGBA({ r: 0.1, g: 0.2, b: 0.3, a: 0.4 });
		expect(rgba.r).toBe(0.1);
		expect(rgba.g).toBe(0.2);
		expect(rgba.b).toBe(0.3);
		expect(rgba.a).toBe(0.4);
	});
	it("should toString", () => {
		let rgba = new RGBA({ r: 0.1, g: 0.2, b: 0.3, a: 0.4 });
		expect(rgba.toString()).toBe("rgba(26,51,77,0.4)");
	});
	it("should throw if anything not between 0 and 1", () => {
		expect(() => {
			new RGBA({ r: 2, g: 0, b: 0, a: 0 });
		}).toThrow();
		expect(() => {
			new RGBA({ r: 0, g: 2, b: 0, a: 0 });
		}).toThrow();
		expect(() => {
			new RGBA({ r: 0, g: 0, b: 2, a: 0 });
		}).toThrow();
		expect(() => {
			new RGBA({ r: 0, g: 0, b: 0, a: 2 });
		}).toThrow();
	});
	describe("fromStops", () => {
		it("should exist", () => {
			expect(RGBA.fromStops).toBeDefined();
		});
		describe("halfway black and white", () => {
			let rgba;
			beforeAll(() => {
				rgba = RGBA.fromStops(
					[{ r: 0, g: 0, b: 0 }, { r: 1, g: 1, b: 1 }],
					0.5
				);
			});
			it("does r", () => {
				expect(rgba.r).toBe(0.5);
			});
			it("does g", () => {
				expect(rgba.g).toBe(0.5);
			});
			it("does b", () => {
				expect(rgba.b).toBe(0.5);
			});
		});
		describe("R to G to B", () => {
			// let rgba;
			let stops = [
				{ r: 1, g: 0, b: 0 },
				{ r: 0, g: 1, b: 0 },
				{ r: 0, g: 0, b: 1 }
			];

			// beforeAll(() => {
			// });
			it("stop 1", () => {
				let rgba = RGBA.fromStops(stops, 0);
				expect(rgba.r).toBe(1);
				expect(rgba.g).toBe(0);
				expect(rgba.b).toBe(0);
			});
			it("midpoint 1", () => {
				let rgba = RGBA.fromStops(stops, 0.25);
				expect(rgba.r).toBe(0.5);
				expect(rgba.g).toBe(0.5);
				expect(rgba.b).toBe(0);
			});
			it("stop 2", () => {
				let rgba = RGBA.fromStops(stops, 0.5);
				expect(rgba.r).toBe(0);
				expect(rgba.g).toBe(1);
				expect(rgba.b).toBe(0);
			});
			it("midpoint 2", () => {
				let rgba = RGBA.fromStops(stops, 0.75);
				expect(rgba.r).toBe(0);
				expect(rgba.g).toBe(0.5);
				expect(rgba.b).toBe(0.5);
			});
			it("stop 3", () => {
				let rgba = RGBA.fromStops(stops, 1);
				expect(rgba.r).toBe(0);
				expect(rgba.g).toBe(0);
				expect(rgba.b).toBe(1);
			});
		});
	});
});
