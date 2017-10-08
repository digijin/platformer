import Base from "./Base";

import type Engine from "Engine";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });
	}
}
