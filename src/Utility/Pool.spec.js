import Pool from "./Pool";

class Thing {
	name: string;
	constructor(name) {
		this.name = name || "thingy";
	}
}

describe("Utility/Pool.spec.js", () => {
	it("should take and return the same type", () => {
		let pool = new Pool(Thing);
		let str = pool.get();
		expect(str.name).toBe("thingy");
	});
	it("should return objects in right order afer reset", () => {
		let pool = new Pool(Thing);
		let str = pool.get();

		str.name = "first";
		str = pool.get();
		str.name = "second";
		pool.reset();
		expect(pool.get().name).toBe("first");
		expect(pool.get().name).toBe("second");
	});
	it("should pass args into constructor", () => {
		let pool = new Pool(Thing, "Bob");
		expect(pool.get().name).toBe("Bob");
	});
});