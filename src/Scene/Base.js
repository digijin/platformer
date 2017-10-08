// @flow

import type Engine from "Engine";

export default class SceneBase {
	engine: Engine;
	start(engine: Engine) {
		this.engine = engine;
		// this.engine.currentScene = this
	}
	end() {
		//wipe engine
		this.engine.objects = [];
	}
}
