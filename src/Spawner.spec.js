import Spawner from "Spawner";

import Engine from "Engine";
import Grid from "Grid";

describe("spawner", () => {
	describe("spawnEnemy", () => {
		let engine, spawner, args;
		beforeEach(() => {
			engine = new Engine();
			engine.register(new Grid());
			spyOn(engine, "register");
			spawner = new Spawner();
			spawner.init(engine);
			spawner.spawnEnemy();
			args = engine.register.calls.first().args[0];
		});
		it("should register a new enemy with engine", () => {
			// let engine = { register: () => {} };
			expect(engine.register).toHaveBeenCalled();
		});
		it("should have passed in enenmy", () => {
			expect(args).toBeDefined();
		});
		it("should have a position", () => {
			expect(args.position).toBeDefined();
		});
		it("should have a type", () => {
			expect(args.type).toBeDefined();
		});
	});
});
