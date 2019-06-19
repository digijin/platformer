// import PlayerState from "./State";
import { AllExcept } from "./State";

describe("PlayerState", () => {
	describe("AllExcept", () => {
		it("should return all except a given entry", () => {
			const allStates = AllExcept();
			expect(AllExcept(allStates[0]).length).toBe(allStates.length - 1);
		});
		it("should return all states", () => {
			expect(AllExcept().length).toBe(6);
		});
	});
});