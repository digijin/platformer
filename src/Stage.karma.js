import * as PIXI from "pixi.js";
import Stage from "./Stage";

class A extends PIXI.Container{}
class B extends PIXI.Container{}
class C extends B{}

describe("Stage", () => {
	let stage;
	let a;
	let b;
	let c;
	beforeEach(() => {
		stage = new Stage();
		a = new A();
		b = new B();
		c = new C();
		stage.addChild(a);
		stage.addChild(b);
		stage.addChild(c);
	});
	it("should have find kids", () =>{

		const instances = stage.getInstancesOfType(A);
		expect(instances.length).toBe(1);
		expect(instances[0]).toBe(a);
	});
	it("should find inherited kids", () => {
		const instances = stage.getInstancesOfType(B);
		expect(instances.length).toBe(2);
		expect(instances[0]).toBe(b);
		expect(instances[1]).toBe(c);
	});
});