import Storage from "Storage";

describe("Storage", () => {
	it("should be defined", () => {
		expect(Storage).toBeDefined();
	});
	it("should choose right process", () => {
		let storage = new Storage();
		if (process.browser && navigator.userAgent.indexOf("Electron") == -1) {
			expect(localStorage).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("BrowserAdapter");
		} else {
			// expect(require("fs")).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("ElectronAdapter");
		}
	});
	it("load should not throw", () => {
		let storage = new Storage();
		storage.save("test", "my data");
		expect(() => {
			storage.load("test");
		}).not.toThrow();
	});
	it("should save and load", () => {
		let storage = new Storage();
		storage.save("test", "my data");
		expect(storage.load("test")).toBe("my data");
	});
});
