import Block from "Grid/Block";
import Point from "Utility/Point";
describe("Grid/Block", () => {
	it("should stringify", () => {
		let block = new Block({
			position: new Point({ x: 1, y: 2 }),
			type: "0",
			grid: { abc: 123 }
		});
		expect(
			JSON.stringify(block, (name, val) => {
				if (name !== "grid") return val;
			})
		).toBe(
			'{"position":{"x":1,"y":2},"type":"0","tint":16777215,"backgroundType":"0"}'
		);
	});
});
