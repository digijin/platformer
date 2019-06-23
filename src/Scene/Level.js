// @flow

import Base from "./Base";
import StoryTeller from "Level/StoryTeller";
import type Engine from "Engine";

export default class Level extends Base {
	manager: StoryTeller;
	start(engine: Engine) {
		super.start(engine);

		this.manager = new StoryTeller();

		engine.manager = this.manager;
		engine.register(this.manager);

		window.dispatchEvent(new Event("level-start"));
	}
}
