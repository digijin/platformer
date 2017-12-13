import { setTimeout } from "core-js/library/web/timers";

fdescribe("webworker", () => {
	it("should be defined", () => {
		expect(window.Worker).toBeDefined();
	});
	let worker;
	it("sohuld load worker file and get a message", done => {
		worker = new Worker("/base/src/Grid/worker.js");
		worker.onmessage = e => {
			console.log("received message from worker");
			done();
		};
		worker.addEventListener(
			"message",
			function(e) {
				console.log("Worker said: ", e.data);
			},
			false
		);
		setTimeout(() => {
			console.log("sending message to worker");
			worker.postMessage("abc123");
		}, 1000);
	});
	// it("should post a message", () => {});
});
