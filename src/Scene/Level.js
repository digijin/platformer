// @flow

import Base from "./Base";

import StoryTeller from "Level/StoryTeller";
import type Engine from "Engine";

// import PauseMenu from "GameObject/PauseMenu";

export default class Level extends Base {
	start(engine: Engine) {
		super.start(engine);

		this.manager = new StoryTeller();
		engine.manager = this.manager;
		engine.register(this.manager);

		// engine.register(new PauseMenu());

		window.dispatchEvent(new Event("level-start"));
	}
}
