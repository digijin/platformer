import { EnemyTypes } from "./Type";
import EnemyType from "./Type";

describe("Actor/Enemy/Type", () => {
	describe("EnemyTypes array", () => {
		it("should an array of more than one object", () => {
			expect(EnemyTypes.length).toBeGreaterThan(0);
		});
		it("sohuld have enemy tpyes", () => {
			expect(EnemyTypes[0].constructor.name).toBe("EnemyType");
		});
	});
});
