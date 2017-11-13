import Player from "Player";
import Enemy from "Enemy";

import Point from "Point";
import Base from "./Base";
import Grid from "Grid";

import EditorWatcher from "Editor/Watcher";

export default class Editor extends Base {
	start(engine) {
		super.start(engine);
		let grid = new Grid({ w: 200, h: 50 });
		// grid.makeTest();
		grid.generate(1);
		engine.register(grid);

		let watcher = new EditorWatcher();
		engine.register(watcher);

		engine.ui.dispatch({ type: "START_SCENE", scene: "editor" });
	}
}
