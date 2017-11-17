import ElectronAdapter from "./Electron";
import rimraf from "rimraf";
import path from "path";
import fs from "fs";
const SAVEDIR = "testsave";
describe("electron adapter", () => {
	let adapter;
	// it("should have no directory to start with", () => {
	// 	expect(fs.existsSync(path.resolve(__dirname, SAVEDIR))).toBe(false);
	// });
	describe("unit", () => {
		beforeEach(() => {
			adapter = new ElectronAdapter(SAVEDIR);
		});
		it("should be defined", () => {
			expect(ElectronAdapter).toBeDefined();
		});
		it("list empty", () => {
			expect(adapter.list().length).toBe(0);
		});
		it("savedir should be defined", () => {
			expect(adapter.savedir).toBeDefined();
		});
	});
	afterAll(done => {
		rimraf(adapter.savedir, () => {
			done();
		});
	});
});
