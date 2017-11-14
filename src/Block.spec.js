import Block from "Block";
import Point from "Point";
describe("Block", () => {
	it("should stringify", () => {
		let block = new Block({
			position: new Point({ x: 1, y: 2 }),
			type: "0"
		});
		expect(JSON.stringify(block)).toBe(
			'{"position":{"x":1,"y":2},"type":"0"}'
		);
	});
});
