import Engine from "Engine";

import GameObject from "GameObject";
import TransitionBase from "Transition/Base";

let sceneMock = () => {
	return {
		start: () => {},
		end: () => {}
	};
};
let transitionMock = () => {
	return new TransitionBase();
};

describe("Game/Engine", () => {
	let engine;
	beforeEach(() => {
		engine = new Engine();
		engine.init(document.createElement("div"));
	});
	it("shuld add stuff to objects", () => {
		expect(engine.objects).toBeDefined();
		let obj = new GameObject();
		engine.register(obj);
		expect(engine.objects[0]).toBe(obj);
	});
	it("should give objects destroy", () => {
		let obj = new GameObject();
		engine.register(obj);
		expect(obj.destroy).toBeDefined();
	});
	it("should remove objects when destroyed", () => {
		let obj = new GameObject();
		engine.register(obj);
		obj.destroy();
		expect(engine.objects.length).toBe(0);
		// expect(engine.objects[0]).toBe(null);
	});
	// it("should remove null objects after update", () => {
	// 	let obj = new GameObject();
	// 	engine.register(obj);
	// 	obj.destroy();
	// 	engine.update();
	// 	engine.kill();
	// 	expect(engine.objects.length).toBe(0);
	// });

	describe("transitions", () => {
		it("sohuld register transition", () => {
			spyOn(engine, "register");
			engine.startSceneTransition(sceneMock(), transitionMock());
			expect(engine.register).toHaveBeenCalled();
		});
		it("should block other startscenes", () => {
			engine.startSceneTransition(sceneMock(), transitionMock());
		});
	});
});
