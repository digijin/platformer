import { setTimeout } from "core-js/library/web/timers";

const workerPath = "/base/src/worker/grid.worker.js";

describe("grid.worker.karma.js renderer", () => {
	let worker;
	beforeEach(() => {
		worker = new Worker(workerPath);
	});
	afterEach(() => {
		worker.terminate();
	});
	it("should load worker file and get availability", done => {
		worker.onmessage = e => {
			expect(e.data).toBe("available");
			done();
		};
		worker.postMessage({ action: "availability" });
	});

	it("should return a fucking canvas", () => {
		// let canvas = document.createElement("canvas");
		// let context = canvas.getContext("2d");
		// context.fillStyle = "black";
		// context.fillRect(10, 10, 100, 100);
		// let canvasData = context.getImageData(
		// 	0,
		// 	0,
		// 	canvas.width,
		// 	canvas.height
		// );
		// worker = new Worker(workerPath);
		// worker.onmessage = e => {
		// 	let returnCanvasData = e.data;
		// 	expect(returnCanvasData.data.toString()).toBe(
		// 		canvasData.data.toString()
		// 	);
		// 	done();
		// };
		// worker.postMessage({ action: "renderTile", data: canvasData });
	});
});
