import TrailRenderer from "TrailRenderer";

import Point from "Point";

describe("TrailRenderer", () => {
	let target, trailRenderer;
	beforeEach(() => {
		target = { position: new Point({ x: 1, y: 2 }) };
		trailRenderer = new TrailRenderer({
			target: target,
			offset: new Point(),
			length: 10
		});
	});
	describe("constructor", () => {
		it("should set its position to parent plus offset", () => {
			// trailRenderer.update();
			expect(trailRenderer.position.x).toBe(1);
			expect(trailRenderer.position.y).toBe(2);
		});
	});
	describe("update", () => {
		it("should maintain a list of history of each frame", () => {
			let start = trailRenderer.history.length;
			trailRenderer.update();
			expect(trailRenderer.history.length).toBe(start + 1);
		});
		it("should obey length", () => {
			for (let i = 0; i < 100; i++) {
				trailRenderer.update();
			}
			expect(trailRenderer.history.length).toBe(10);
		});
	});
});
