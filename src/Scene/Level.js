// @flow

import Player from "Actor/Player";
import Enemy from "Enemy";

import Point from "Point";
import Base from "./Base";
import Grid from "Grid";
import Background from "Background";

import Spawner from "Spawner";

import type Engine from "Engine";

export default class Level extends Base {
	start(engine: Engine) {
		super.start(engine);
		let grid = new Grid({ w: 200, h: 50 });
		// grid.makeTest();
		grid.generate(1);
		// FLOWHACK
		let gridData = require("levels/level.txt");
		grid.load(gridData);
		engine.register(grid);

		engine.register(new Background());

		let player = new Player({ position: new Point({ x: 50, y: 100 }) });
		engine.register(player);
		// engine.register(new Enemy({ position: new Point({ x: 250, y: 250 }) }));
		// engine.register(new Spawner());

		engine.ui.dispatch({ type: "START_SCENE", scene: "level" });
	}
}
