import * as PIXI from "pixi.js";
import recurseSearch from "test/util/recurseSearch";
describe("recurseSearch", () => {
	let stage: PIXI.Container;
	let firstChild;
	let secondChild;
	let firstGrandChild;
	let secondGrandChild;
	let thirdGrandChild;
	beforeAll(() => {
		stage = new PIXI.Container();
		firstChild = new PIXI.Container();
		secondChild = new PIXI.Container();
		firstGrandChild = new PIXI.Container();
		secondGrandChild = new PIXI.Container();
		thirdGrandChild = new PIXI.Container();
		stage.addChild(firstChild);
		stage.addChild(secondChild);
		firstChild.addChild(firstGrandChild);
		firstChild.addChild(secondGrandChild);
		secondChild.addChild(thirdGrandChild);
		stage.testingId = "stage";
		firstChild.testingId = "firstChild";
		secondChild.testingId = "secondChild";
		firstGrandChild.testingId = "firstGrandChild";
		secondGrandChild.testingId = "secondGrandChild";
		thirdGrandChild.testingId = "thirdGrandChild";
	});
	it("firstChild", () => {
		expect(recurseSearch("firstChild", stage)).toBe(firstChild);
	});
	it("secondChild", () => {
		expect(recurseSearch("secondChild", stage)).toBe(secondChild);
	});
	it("firstGrandChild", () => {
		expect(recurseSearch("firstGrandChild", stage).testingId).toBe(
			firstGrandChild.testingId
		);
	});
	it("secondGrandChild", () => {
		expect(recurseSearch("secondGrandChild", stage).testingId).toBe(
			secondGrandChild.testingId
		);
	});
	it("thirdGrandChild", () => {
		expect(recurseSearch("thirdGrandChild", stage).testingId).toBe(
			thirdGrandChild.testingId
		);
	});
	it("undefined", () => {
		expect(recurseSearch("undefined", stage)).not.toBeDefined();
	});
});
