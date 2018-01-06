// @flow

import Player from "Actor/Player";
import Enemy from "Actor/Enemy";

import Point from "Utility/Point";
import Base from "./Base";
import Grid from "Grid";
import Background from "GameObject/Background";

import Spawner from "GameObject/Spawner";

import StoryTeller from "GameObject/StoryTeller";

import type Engine from "Engine";

import PauseMenu from "GameObject/PauseMenu";

export default class Level extends Base {
	start(engine: Engine) {
		super.start(engine);
		engine.register(new PauseMenu());
		let grid = new Grid({ w: 200, h: 50 });
		// grid.makeTest();
		// grid.generate(1);
		// FLOWHACK
		let gridData = require("levels/level.txt");
		engine.register(grid);
		grid.load(gridData);

		engine.register(new Background());
		engine.register(new StoryTeller());

		let player = new Player({ position: new Point({ x: 450, y: 100 }) });
		engine.register(player);

		engine.ui.dispatch({ type: "START_SCENE", scene: "level" });
	}
}
