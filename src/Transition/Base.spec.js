// @flow
import TransitionBase from "./Base";

describe("Transition/Base.spec.js", () => {
	it("should be defined", () => {
		expect(TransitionBase).toBeDefined();
	});
	it("should call function onStartNextScene", () => {
		const tb = new TransitionBase();
		const spy = { fn: () => {} };
		spyOn(spy, "fn");
		tb.onStartNextScene(spy.fn);
		tb.startNextScene(spy.fn);
		expect(spy.fn).toHaveBeenCalled();
	});
	it("should call function onEndLastScene", () => {
		const tb = new TransitionBase();
		const spy = { fn: () => {} };
		spyOn(spy, "fn");
		tb.onEndLastScene(spy.fn);
		tb.endLastScene(spy.fn);
		expect(spy.fn).toHaveBeenCalled();
	});
});
