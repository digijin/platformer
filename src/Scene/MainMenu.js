import Base from "./Base";

import type Engine from "Engine";

import Menu from "MainMenu/Menu";
import Background from "Background";

import DigijinLogo from "MainMenu/DigijinLogo";
import Point from "Point";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });

		engine.view.offset = new Point({ x: -500, y: -3000 });

		engine.register(new Menu());
		engine.register(new Background());

		document.body.style.backgroundColor = "lightblue";
	}
}
