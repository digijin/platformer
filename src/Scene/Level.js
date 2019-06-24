// @flow

import Base from "./Base";
import LevelManager from "Level/Manager";
import type Engine from "Engine";

export default class Level extends Base {
	manager: LevelManager;
	start(engine: Engine) {
		super.start(engine);

		this.manager = new LevelManager(engine);

		engine.manager = this.manager;
		// engine.register(this.manager);
		engine.stage.addChild(this.manager);


		window.dispatchEvent(new Event("level-start"));
	}
}
