import Engine from "Engine";

import GameObject from "GameObject";
import TransitionBase from "Transition/Base";

if (window.jest) {
    jest.mock("pixi.js");
    jest.mock("@pixi/filter-glow");
}

let sceneMock = () => {
    return {
        start: () => {},
        end: () => {}
    };
};
let transitionMock = () => {
    return new TransitionBase();
};

describe("Game/Engine.spec.js", () => {
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
	it("should call init", () => {
		let go = new GameObject();
		spyOn(go, "init");
		engine.register(go);
		expect(go.init).toHaveBeenCalled();
	})

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
