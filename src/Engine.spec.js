import Engine from "Engine";

import GameObject from "GameObject";

describe("Game/Engine", () => {
	let engine;
	beforeEach(() => {
		engine = new Engine();
		engine.init(document.createElement("div"));
	});
	it("shuld add stuff to objects", () => {
		expect(engine.objects).toBeDefined();
		let obj = { test: "obj" };
		engine.register(obj);
		expect(engine.objects[0]).toBe(obj);
	});
	it("should give objects destroy", () => {
		let obj = {};
		engine.register(obj);
		expect(obj.destroy).toBeDefined();
	});
	it("should null out objects when destroyed", () => {
		let obj = {};
		engine.register(obj);
		obj.destroy();
		// expect(engine.objects.length).toBe(0);
		expect(engine.objects[0]).toBe(null);
	});
	it("should remove null objects after update", () => {
		let obj = {};
		engine.register(obj);
		obj.destroy();
		engine.update();
		engine.kill();
		expect(engine.objects.length).toBe(0);
	});
});
