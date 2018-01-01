import Rect from "Utility/Rect";
import Base from "./Base";
import Grid from "Grid";

import config from "config";

import EditorWatcher from "Editor/Watcher";

import GameObject from "GameObject";

class Runner extends GameObject {
	constructor(grid) {
		super();
		this.grid = grid;
		this.scores = [];
	}
	update() {
		let rect = new Rect({
			t: 0,
			l: 0,
			r: this.grid.blocks.length * config.grid.width,
			b: this.grid.blocks[0].length * config.grid.width
		});
		let start = new Date().getTime();
		this.grid.tileCache = {};
		this.grid.renderTiles(rect);
		let time = new Date().getTime() - start;
		this.scores.push(time);
		let avg = this.scores.reduce((a, b) => a + b) / this.scores.length;
		console.log("took", time, "average", Math.round(avg));
	}
}

export default class Benchmark extends Base {
	start(engine) {
		super.start(engine);
		let grid = new Grid({ w: 200, h: 50 });
		let gridData = require("levels/level.txt");
		engine.register(new Runner(grid));
		engine.register(grid);
		grid.load(gridData);
		console.log("beginning grid benchmark");

		// let time;
		// let scores = [];
		// for (let i = 0; i < 3; i++) {
		// 	start = new Date().getTime();
		// 	grid.tileCache = {};
		// 	grid.renderTiles(rect);
		// 	time = new Date().getTime() - start;
		// 	scores.push(time);
		// 	let avg = scores.reduce((a, b) => a + b) / scores.length;
		// 	console.log("took", time, "average", Math.round(avg));
		// }
	}
}
