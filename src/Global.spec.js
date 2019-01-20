
import Globals from "./Globals";

describe("Globals", () => {
	beforeEach(() => {
		Globals.clear();
	});
	describe("get", () => {
		it("should return a promise", () => {
			expect(Globals.get("key").toString()).toBe("[object Promise]");
		});
		it("should instantly return thenable if value exists", (done) => {
			Globals.values = { key: "abc" };
			Globals.get("key").then((val)=>{
				// output = val;
				expect(val).toBe("abc");
				done();
			});
		});

	});
	describe("set", () => {
		it("should set a key", () =>{
			Globals.set("key", "123");
			expect(Globals.values["key"]).toBe("123");
		});
		it("should notify other promises", (done) => {
			Globals.get("key").then((val) => {
				expect(val).toBe("abc123");
				done();
			});
			Globals.set("key", "abc123");
		});
        

	});
    
	describe("remove", () => {
		it("shoulds remove", () => {
			Globals.values = { key: "abc" };
			Globals.remove("key");
			expect(Globals.values["key"]).not.toBeDefined();

		});
	});
	describe("clear", () => {});
});