//@flow

import Point from "Utility/Point";
import type Engine from "Engine";

import GameObject from "GameObject";
import * as PIXI from "pixi.js";

export default class Shell extends GameObject {
    position: Point;
    h: number; //momentum
    v: number; //momentum
    time: number;
    color: string;
    container: PIXI.Container;
    constructor(params: Object) {
    	super();
    	this.time = 1 + Math.random();
    	this.color = "#000000";
    	Object.assign(this, params);
    }
    graph: PIXI.Graphics;
    init(engine: Engine) {
    	super.init(engine);
    	if (!this.container) {
    		this.container = this.engine.stage;
    	}
    	this.graph = new PIXI.Graphics();
    	this.container.addChild(this.graph);
    }
    destroy() {
    	super.destroy();
    	this.exit();
    }
    exit() {
    	this.container.removeChild(this.graph);
    }

    update() {
    	this.time -= this.engine.deltaTime;
    	let old: Point = this.position.clone();
    	this.position.x += this.h;
    	this.position.y += this.v;
    	this.v *= 1 - this.engine.deltaTime;
    	this.v += this.engine.deltaTime * 3;
    	this.graph.clear();
    	this.graph.position.set(old.x, old.y);
    	this.graph
    		.lineStyle(1, 0xffffff)
    		.moveTo(0, 0)
    		.lineTo(this.position.x - old.x, this.position.y - old.y);
    	//TODO DETECT GROUND PROPER LIKE
    	if (this.engine.grid.isPositionBlocked(this.position) && this.v > 0) {
    		// if(this.position.y>250 && this.v>0){
    		this.v = -this.v;
    	}
    	if (this.time < 0) {
    		this.destroy();
    	}
    }
}
