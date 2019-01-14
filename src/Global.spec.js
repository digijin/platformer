
import Global from "./Global";

describe("Global", () => {
	describe("get", () => {
		it("should return a promise", () => {
			expect(Global.get("key").toString()).toBe("[object Promise]");
		});
		it("should instantly return thenable if value exists", (done) => {
			Global.values = { key: "abc" };
			Global.get("key").then((val)=>{
				// output = val;
				expect(val).toBe("abc");
				done();
			});
		});

	});
	describe("set", () => {
		it("should set a key", () =>{
			Global.values = {};
			Global.set("key", "123");
			expect(Global.values["key"]).toBe("123");
		});
        

	});
	describe("clear", () => {});
});