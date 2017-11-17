import Storage from "Storage";

describe("Storage", () => {
	it("should be defined", () => {
		expect(Storage).toBeDefined();
	});
	it("should choose right process", () => {
		let storage = new Storage();
		if (process.browser) {
			expect(localStorage).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("BrowserAdapter");
		} else {
			// expect(require("fs")).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("ElectronAdapter");
		}
	});
	it("should save and load", () => {
		let storage = new Storage();
		storage.save("test", "my data");
		expect(storage.load("test")).toBe("my data");
	});
});
