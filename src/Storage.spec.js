import Storage from "Storage";

describe("Storage", () => {
	let storage;
	beforeAll(() => {
		storage = new Storage();
		storage.save("test", "my data");
	});
	it("should be defined", () => {
		expect(Storage).toBeDefined();
	});
	it("should choose right process", () => {
		if (process.browser && navigator.userAgent.indexOf("Electron") == -1) {
			expect(localStorage).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("BrowserAdapter");
		} else {
			// expect(require("fs")).toBeDefined();
			expect(storage.adapter.constructor.name).toBe("ElectronAdapter");
		}
	});
	it("load should not throw", () => {
		expect(() => {
			storage.load("test");
		}).not.toThrow();
	});
	it("should save and load", () => {
		expect(storage.load("test")).toBe("my data");
	});
	if (navigator.userAgent.indexOf("Electron") > -1) {
		describe("Electron", () => {
			it("should run electron tests", () => {
				expect(storage.adapter.savedir).not.toBe("/");
			});
		});
	}
});
