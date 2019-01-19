
class A {

}

class B extends A{

}

class C extends B{

}

describe("class inheritance", () => {
	it("should get ancestor", () => {
		const c = new C();
		expect(c instanceof A).toBe(true);
	});
});