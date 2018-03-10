//@flow

// import Point from "Utility/Point";
import type Engine from "Engine";
//
// import GameObject from "GameObject";
import * as PIXI from "pixi.js";

import Particle from "../Particle";

export default class BoosterParticle extends Particle {
    lineWidth: number = 10;
    color: number = 0x55afcd;
    // constructor(params) {
    // 	super(params);
    // 	// console.log("hi I'm boosterparticle my width is %n", this.lineWidth);
    // }
    init(engine: Engine) {
    	super.init(engine);
    	this.graph.filters = [new PIXI.filters.BlurFilter(2, 2, 2)];
    }
}
