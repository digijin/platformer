import { EnemyTypes } from "EnemyType";
import EnemyType from "EnemyType";

describe("EnemyType", () => {
	describe("EnemyTypes array", () => {
		it("should an array of more than one object", () => {
			expect(EnemyTypes.length).toBeGreaterThan(0);
		});
		it("sohuld have enemy tpyes", () => {
			expect(EnemyTypes[0].constructor.name).toBe("EnemyType");
		});
	});
});
