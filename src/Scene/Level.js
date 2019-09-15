// @flow

import Base from "./Base";
import Container from "Level/Container";
import type Engine from "Engine";
import log from "loglevel";

export default class Level extends Base {
	manager: LevelManager;

	start(engine: Engine) {
		super.start(engine);

		// this.manager = new LevelManager(engine);
		//
		// engine.manager = this.manager;
		// // engine.register(this.manager);
		// engine.stage.addChild(this.manager);


		this.container = new Container({ engine: engine });
		engine.stage.addChild(this.container);

		//TODO unhack
		engine.manager = this.container;


		window.dispatchEvent(new Event("level-start"));
	}

	end() {
		log.debug("Level.end()");
		this.engine.stage.removeChild(this.container);
		super.end();
	}
}
