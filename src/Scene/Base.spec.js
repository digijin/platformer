import SceneBase from "./Base";

describe("Scene/Base.spec.js", () => {
	describe("end", () => {
		// it("should leave only items tagged transition", () => {
		// 	let base = new SceneBase();
		// 	base.engine = { ui: { dispatch: () => {} }, objects: [] };
		// 	base.engine.objects.push({ id: 1, hasTag: () => false });
		// 	base.engine.objects.push({ id: 2, hasTag: () => true });
		// 	base.engine.objects.push({ id: 3, hasTag: () => false });
		// 	base.end();
		// 	expect(base.engine.objects.length).toBe(1);
		// 	expect(base.engine.objects[0].id).toBe(2);
		// });
		it("should call destroyAllExceptTagged", () => {
			const base = new SceneBase();
			const eng = { destroyAllExceptTagged: () => {},  ui: { dispatch: () => {} } };
			spyOn(eng, "destroyAllExceptTagged");
			base.engine = eng;
			base.end() ;
			expect(eng.destroyAllExceptTagged).toHaveBeenCalled();
		});
	});
});
