import * as PIXI from "pixi.js";

PIXI.loader.add("explosion", "spritesheet.json");
import GameObject from "GameObject";

import Point from "Utility/Point";

const NUM_FRAMES = 106;

export default class Explosion extends GameObject {
	position: Point;
	constructor(params: Object) {
		super();
		let frames = [];
		for (let i = 0; i < NUM_FRAMES; i++) {
			let framenum = i.toString().padStart(4, "0");
			frames.push(
				PIXI.loader.resources["explosion"].textures[
					"explosion" + framenum + ".png"
				]
				// PIXI.Texture.fromFrame("explosion" + framenum + ".png")
			);
		}
		this.movie = new PIXI.extras.MovieClip(frames);
		this.time = NUM_FRAMES / 60;
		this.movie.animationSpeed = 1;
		this.movie.anchor = { x: 0.5, y: 0.5 };
		Object.assign(this, params);
	}

	init(engine) {
		super.init(engine);
		this.movie.play();
		this.engine.stage.addChild(this.movie);
		// this.movie.position = this.position;
		this.positionSprite();
	}

	positionSprite() {
		this.movie.position.x = this.position.x - this.engine.view.offset.x;
		this.movie.position.y = this.position.y - this.engine.view.offset.y;
	}
	update() {
		this.positionSprite();
		this.time -= this.engine.deltaTime;
		if (this.time < 0) {
			this.destroy();
		}
	}
	destroy() {
		this.engine.stage.removeChild(this.movie);
		super.destroy();
	}
}
