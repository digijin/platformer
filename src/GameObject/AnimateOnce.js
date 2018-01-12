import * as PIXI from "pixi.js";
import GameObject from "GameObject";
import Point from "Utility/Point";

export default class AnimateOnce extends GameObject {
	position: Point;
	constructor(params: {
		numFrames: number,
		resource: string,
		prefix: string,
		suffix: string,
		pad: number
	}) {
		super();
		// this.numFrames = params.numFrames;
		Object.assign(this, params);

		let frames = [];
		for (let i = 0; i < this.numFrames; i++) {
			let framenum = i.toString().padStart(params.pad, "0");
			frames.push(
				PIXI.loader.resources[params.resource].textures[
					params.prefix + framenum + params.suffix
				]
				// PIXI.Texture.fromFrame("explosion" + framenum + ".png")
			);
		}
		this.movie = new PIXI.extras.AnimatedSprite(frames);
		this.time = this.numFrames / 60;
		this.movie.animationSpeed = 1;
		this.movie.anchor = { x: 0.5, y: 0.5 };
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
