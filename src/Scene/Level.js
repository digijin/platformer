import Player from "Player";
import Enemy from "Enemy";

import Point from "Point";
import Base from "./Base";
import Grid from "Grid";

import Spawner from "Spawner";

export default class Level extends Base {
	start(engine) {
		super.start(engine);
		let grid = new Grid({ w: 200, h: 50 });
		// grid.makeTest();
		grid.generate(1);
		engine.register(grid);

		let player = new Player({ position: new Point({ x: 50, y: 100 }) });
		engine.register(player);
		// engine.register(new Enemy({ position: new Point({ x: 250, y: 250 }) }));
		engine.register(new Spawner());

		engine.ui.dispatch({ type: "START_SCENE", scene: "level" });
	}
}
