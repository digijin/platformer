import Base from "./Base";

import type Engine from "Engine";

import Menu from "MainMenu/Menu";
import Background from "Background";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });
		engine.register(new Menu());
		engine.register(new Background());
	}
}
