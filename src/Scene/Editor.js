import Enemy from "Actor/Enemy";

import Point from "Utility/Point";
import Base from "./Base";
import Grid from "Grid";
import Background from "GameObject/BackgroundBuildings";

import EditorWatcher from "Editor/Watcher";

export default class Editor extends Base {
	start(engine) {
		super.start(engine);

		let watcher = new EditorWatcher();
		engine.register(watcher);

		let grid = new Grid({
			size: { w: 100, h: 100 },
			parent: engine.stage
		});

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0
		});
		// grid.makeTest();
		grid.generate(1);
		engine.register(grid);

		document.body.style.backgroundColor = "#87efff";
		let bg = new Background();
		bg.spawnExplosion = () => {};
		engine.register(bg);

		engine.ui.dispatch({ type: "START_SCENE", scene: "editor" });
	}
}
