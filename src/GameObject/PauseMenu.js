import GameObject from "GameObject";

export default class PauseMenu extends GameObject {
	constructor() {
		super();
	}

	update() {
		if (this.engine.input.getKeyDown("escape")) {
			this.engine.paused = !this.engine.paused;
			if (this.engine.paused) {
				this.engine.ui.dispatch({ type: "PAUSE", scene: "level" });
			}
		}
	}
}
