import { setTimeout } from "core-js/library/web/timers";

fdescribe("webworker", () => {
	it("should be defined", () => {
		expect(window.Worker).toBeDefined();
	});
	let worker;
	it("should load worker file and get a message", done => {
		worker = new Worker("/base/src/Grid/worker.js");
		worker.onmessage = e => {
			console.log("received message from worker", e.data);
			done();
		};
		console.log("sending message to worker");
		worker.postMessage({ action: "repeat", data: "abc123" });
	});
	// it("should post a message", () => {});
});
