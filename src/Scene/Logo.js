import Base from "./Base";

import type Engine from "Engine";

import DigijinLogo from "MainMenu/DigijinLogo";

export default class Logo extends Base {
	start(engine: Engine) {
		super.start(engine);

		document.body.style.backgroundColor = "black";
		engine.ui.dispatch({ type: "START_SCENE", scene: "logo" });
		engine.register(new DigijinLogo());

		window.dispatchEvent(new Event("logo-start"));
	}
}
