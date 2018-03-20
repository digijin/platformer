//@flow
import type Engine from "Engine";
import Base from "./Base";

import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import * as PIXI from "pixi.js";

import log from "loglevel";

// FLOWHACK
export default class BriefingEnd extends Base {
    frame: number = 0;
    time: number = 0;
    flash: PIXI.Graphics;
    swapped: boolean = false;
    flashMaxWidth: number = 100;
    manager: Object;
    init(engine: Engine) {
    	log.debug("BriefingEnd transition has begun");
    	this.tag("transition");
    	super.init(engine);
    	// this.engine.objectsTagged("briefingpanel").forEach(bp => {
    	//     bp.z = 50;
    	//     bp.props.delay = Math.random();
    	// });
    	// this.engine.objectsTagged("briefingmanager").forEach(bm => {
    	//     bm.mouseControl = false;
    	// });
    	this.flash = new PIXI.Graphics();
    	this.flash.beginFill(0xffffff).drawCircle(0, 0, 10);
    	this.flash.x = window.innerWidth / 2;
    	this.flash.y = window.innerHeight / 2;
    	this.flash.filters = [new AdvancedBloomFilter()];
    	this.engine.stage.addChild(this.flash);
    	this.manager = this.engine.objectsTagged("briefingmanager")[0];
    }

    update() {
    	if (
    		this.manager.container.transform.scale.x > 0.1 &&
            this.flash.width < this.flashMaxWidth - 1
    	) {
    		this.manager.container.transform.scale.x *= 0.9;
    		this.manager.container.transform.scale.y *= 0.9;

    		let n = 8;

    		this.flash.width =
                (this.flashMaxWidth + this.flash.width * n) / (n + 1);
    		this.flash.height =
                (this.flashMaxWidth + this.flash.height * n) / (n + 1);
    	} else if (this.flash.height > 0) {
    		this.manager.container.visible = false;
    		this.flash.width += this.engine.deltaTime * 1500;
    		this.flash.height -= this.engine.deltaTime * 300;
    	} else {
    		log.debug("BriefingEnd transition has reached end");
    		this.endLastScene();
    		this.startNextScene();
    		this.end();
    	}

    	// this.frame++;
    	// this.time += this.engine.deltaTime;
    	// if (this.time > SECS && !this.swapped) {
    	//     this.swapped = true;
    	// } else if (this.time > SECS * 2) {
    	// }
    }

    end() {
    	// super.end();

    	this.engine.stage.removeChild(this.flash);
    	this.destroy();
    }
}
