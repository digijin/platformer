// @flow
import log from "loglevel";
import type Engine from "Engine";

export default class SceneBase {
	engine: Engine;
	start(engine: Engine) {
		this.engine = engine;
		// this.engine.currentScene = this
		log.debug("starting scene", this.constructor.name);
	}

	end() {
		//wipe engine
		log.debug("ending scene", this.constructor.name);
		this.engine.ui.dispatch({ type: "END_SCENE" });
		this.engine.destroyAllExceptTagged("transition");
	}
}
