import Storage from "Storage";

describe("Storage", () => {
	it("should be defined", () => {
		expect(Storage).toBeDefined();
	});
	it("should choose right process", () => {
		let storage = new Storage();
		if (process.browser) {
			expect(storage.adapter.constructor.name).toBe("BrowserAdapter");
		}
	});
});
