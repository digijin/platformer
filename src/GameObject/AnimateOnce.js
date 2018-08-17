// @flow

import * as PIXI from "pixi.js";
import GameObject from "GameObject";
import Point from "Utility/Point";

import log from "loglevel";

export default class AnimateOnce extends GameObject {
    position: Point;
    once: boolean = true;
    constructor(params: {
        numFrames: number,
        resource: string,
        prefix: string,
        suffix: string,
        pad: number
    }) {
    	super();
    	// this.numFrames = params.numFrames;
    	//defaults
    	// this.once = true;
    	this.speed = 1;
    	this.position = new Point();

    	Object.assign(this, params);

    	const frames = [];
    	for (let i = 0; i < this.numFrames; i++) {
    		const framenum = i.toString().padStart(params.pad, "0");
    		frames.push(
    			PIXI.loader.resources[params.resource].textures[
    				params.prefix + framenum + params.suffix
    			]
    		);
    		// PIXI.Texture.fromFrame("explosion" + framenum + ".png"));
    	}
    	// console.log("loading frames", frames);
    	this.movie = new PIXI.extras.AnimatedSprite(frames);
    	this.time = this.numFrames / (60 * this.speed);
    	this.movie.animationSpeed = this.speed;
    	this.movie.anchor = {
    		x: 0.5,
    		y: 0.5,
    	};
    }

    init(engine) {
    	super.init(engine);
    	this.movie.play();
    	// console.log("init");
    	if (!this.parent) {
    		this.parent = this.engine.stage;
    	}
    	log.debug(
    		"adding",
    		this.movie.constructor.name,
    		"to",
    		this.parent.constructor.name
    	);
    	this.parent.addChild(this.movie);
    	// console.log(this.parent.children);
    	// console.log("adding", this.movie, "to", this.engine.stage);
    	// this.movie.position = this.position;
    	this.positionSprite();
    }

    exit() {
    	// console.log("exit");
    	this.parent.removeChild(this.movie);
    }

    update() {
    	this.positionSprite();
    	this.time -= this.engine.deltaTime;
    	if (this.once && this.time < 0) {
    		this.destroy();
    	}
    }

    positionSprite() {
    	this.movie.position.x = this.position.x;
    	this.movie.position.y = this.position.y;
    }

    destroy() {
    	// console.log("cleanup ");
    	this.parent.removeChild(this.movie);
    	super.destroy();
    }
}
