import { setTimeout } from "core-js/library/web/timers";

const workerPath = "/base/src/worker/base.worker.js";

describe("worker.karma.js webworker basics", () => {
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
	it("should return a message", done => {
		worker = new Worker(workerPath);
		worker.onmessage = e => {
			expect(e.data).toBe("abc123");
			done();
		};
		worker.postMessage({ action: "repeat", data: "abc123" });
	});
	it("should return a fucking canvas", done => {
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");

		context.fillStyle = "black";
		context.fillRect(10, 10, 100, 100);

		let canvasData = context.getImageData(
			0,
			0,
			canvas.width,
			canvas.height
		);

		worker = new Worker(workerPath);
		worker.onmessage = e => {
			let returnCanvasData = e.data;
			expect(returnCanvasData.data.toString()).toBe(
				canvasData.data.toString()
			);
			done();
		};
		worker.postMessage({ action: "repeat", data: canvasData });
	});
});
