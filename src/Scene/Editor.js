// import Enemy from "Level/Actor/Enemy";

import Base from "./Base";
import EditorWatcher from "Editor/Watcher";
import type Engine from "Engine";

export default class Editor extends Base {
	start(engine: Engine) {
		super.start(engine);

		this.manager = new EditorWatcher();
		engine.manager = this.manager;
		engine.register(this.manager);

		engine.ui.dispatch({ type: "START_SCENE", scene: "editor" });
		window.dispatchEvent(new Event("editor-start"));
	}
}
