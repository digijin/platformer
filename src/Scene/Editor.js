// import Enemy from "Level/Actor/Enemy";

import Point from "Utility/Point";
import Base from "./Base";
import Grid from "Grid";
import Background from "GameObject/BackgroundBuildings";

import EditorWatcher from "Editor/Watcher";

export default class Editor extends Base {
	start(engine) {
		super.start(engine);

		const watcher = new EditorWatcher();
		engine.register(watcher);

		const grid = new Grid({
			size: { w: 50, h: 50 },
			parent: engine.stage,
		});

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0,
		});
		// grid.makeTest();
		// grid.generate(1);
		engine.register(grid);

		document.body.style.backgroundColor = "#87efff";
		const bg = new Background();
		bg.spawnExplosion = () => {};
		engine.register(bg);

		engine.ui.dispatch({ type: "START_SCENE", scene: "editor" });
	}
}
