import { ai } from "Enemy";

export function* testgen(a): Generator<*, *, *> {
	let b = yield a;
	let c = yield b;
	return c;
	return "d"; //unreachable
}
describe("test generators", () => {
	it("understanding generators", () => {
		expect(testgen).toBeDefined();
		let instance = testgen("a");
		expect(instance.next("b").value).toBe("a");
		expect(instance.next("c").value).toBe("c");
		expect(instance.next().done).toBe(true);
		expect(instance.next().done).toBe(true);
	});
});

describe("Enemy", () => {
	describe("testgen", () => {});
});
