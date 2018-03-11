import Base from "./Base";

import type Engine from "Engine";

import ResultsManager from "../Results/Manager";

export default class Results extends Base {
	start(engine: Engine) {
		super.start(engine);

		this.manager = new ResultsManager();
		engine.register(this.manager);

		document.body.style.backgroundColor = "yellow";
		engine.ui.dispatch({ type: "START_SCENE", scene: "results" });
	}
}
