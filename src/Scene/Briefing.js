import Base from "./Base";

import type Engine from "Engine";

export default class Briefing extends Base {
	start(engine: Engine) {
		super.start(engine);

		document.body.style.backgroundColor = "blue";
		engine.ui.dispatch({ type: "START_SCENE", scene: "briefing" });
	}
}
