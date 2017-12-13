import { setTimeout } from "core-js/library/web/timers";

const workerPath = "/base/src/worker/base.worker.js";

fdescribe("webworker", () => {
	let worker;
	it("should be defined", () => {
		expect(window.Worker).toBeDefined();
		worker = new Worker(workerPath);
	});
	afterEach(() => {
		worker.terminate();
	});
	it("should load worker file and get availability", done => {
		worker = new Worker(workerPath);
		worker.onmessage = e => {
			expect(e.data).toBe("available");
			done();
		};
		worker.postMessage({ action: "availability" });
	});
	it("should return a message", () => {
		worker = new Worker(workerPath);
		worker.onmessage = e => {
			expect(e.data).toBe("abc123");
			done();
		};
		worker.postMessage({ repeat: "abc123" });
	});
	// it("should return a fucking canvas", () => {
	// 	worker = new Worker(workerPath);
	// 	worker.onmessage = e => {
	// 		expect(e.data).toBe("abc123");
	// 		done();
	// 	};
	// 	worker.postMessage({ repeat: document.createElement("canvas") });
	// });
});
