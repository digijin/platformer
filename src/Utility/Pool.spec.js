import Pool from "./Pool";

describe("Utility/Pool.spec.js", () => {
	it("should take and return the same type", () => {
		let pool = new Pool(String);
		let str = pool.get();
		expect(str).toBe("");
	});
	it("should return objects in right order afer reset", () => {
		let pool = new Pool(String);
		let str = pool.get();
		str += "first";
		str = pool.get();
		str += "second";
		pool.reset();
		expect(pool.get()).toBe("first");
		expect(pool.get()).toBe("second");
	});
});
