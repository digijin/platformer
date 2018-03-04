import Enemy from "Actor/Enemy";

import Point from "Utility/Point";
import Base from "./Base";
import Grid from "Grid";

import Background from "Equip/Background";
import Manager from "Equip/Manager";

export default class Equip extends Base {
	start(engine) {
		super.start(engine);
		engine.view.offset = new Point({
			x: 0,
			y: 0
		});

		engine.register(new Manager());

		document.body.style.backgroundColor = "#16502d";
		engine.register(new Background());
		// engine.ui.dispatch({ type: "START_SCENE", scene: "equip" });
	}
}
