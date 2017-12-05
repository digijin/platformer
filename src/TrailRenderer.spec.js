import TrailRenderer from "TrailRenderer";

import Point from "Point";
describe("TrailRenderer", () => {
	describe("constructor", () => {
		it("should set its position to parent plus offset", () => {
			let target = { position: new Point({ x: 1, y: 2 }) };
			let trailRenderer = new TrailRenderer({
				target: target,
				offset: new Point()
			});
			// trailRenderer.update();
			expect(trailRenderer.position.x).toBe(1);
			expect(trailRenderer.position.y).toBe(2);
		});
	});
});
