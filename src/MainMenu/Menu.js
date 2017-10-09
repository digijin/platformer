import GameObject from "GameObject";

import Level from "Scene/Level";

export default class MainMenu extends GameObject {
	constructor() {
		super();
	}
	update() {
		if (this.engine.input.getButton("jump")) {
			this.engine.startScene(new Level());
		}
		this.engine.ctx.translate(1, -1);
		this.engine.ctx.rotate(this.engine.deltaTime);
		this.engine.ctx.fillText("game!", 0, 6);
	}
}
