// @flow
import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import type Engine from "Engine";

import { GlitchFilter } from "@pixi/filter-glitch";

import GameObject from "GameObject";
type Props = {
    offset: Point,
    z: number
};

export default class Panel extends GameObject {
    container: PIXI.Container;
    content: PIXI.Container;
    glitching: boolean = false;

    background: PIXI.Container;
    border: PIXI.Graphics;

    padding: number = 20;

    props: Props;

    constructor(props: Props) {
    	super();
    	this.props = props;
    	this.z = props.target ? props.target.z : 0;
    	this.z = 0;
    	this.tag("briefingpanel");
    }

    init(engine: Engine) {
    	super.init(engine);
    	this.setupContainers();
    	this.props.delay = Math.random() / 2;
    	this.container.alpha = 0.8;
    	this.container.visible = false;
    	// this.position();
    }

    update() {
    	// this.glitch();
    	if (this.props.delay > 0) {
    		this.props.delay -= this.engine.deltaTime;
    		// this.container.alpha = 0
    	} else {
    		this.container.visible = true;

    		// let target = 0;
    		// if (this.props.target) {
    		//     target = this.props.target.z;
    		// }
    		let target = this.z;
    		let diff = this.props.z - target;

    		// this.props.z *= 1 - this.engine.deltaTime;
    		this.props.z -= diff * this.engine.deltaTime;
    		// if (diff < 0) {
    		//     this.props.z += this.engine.deltaTime / 4;
    		// }

    		// if (this.props.z < 0) {
    		//     this.props.z += this.engine.deltaTime;
    		// }
    		this.position();
    	}
    }

    position() {
    	this.container.position = this.props.offset
    		.subtract(this.engine.view.offset)
    		.multiply(1 + this.props.z);
    	this.container.scale.x = 1 + this.props.z;
    	this.container.scale.y = 1 + this.props.z;
    }

    setupContainers() {
    	this.content = new PIXI.Container();
    	this.background = new PIXI.Container();

    	this.container = new PIXI.Container();
    	this.container.addChild(this.background);
    	this.container.addChild(this.content);
    	this.content.position = {
    		x: this.padding,
    		y: this.padding
    	};

    	let spr = new PIXI.Sprite(PIXI.Texture.WHITE);
    	spr.tint = 0x221d1f;
    	spr.width = 100;
    	spr.height = 100;

    	this.border = new PIXI.Graphics();
    	this.container.addChild(this.border);
    	this.container.z = this.z;
    	this.background.addChild(spr);
    }

    glitch() {
    	if (Math.random() < 0.01) {
    		this.container.filters = [new GlitchFilter()];
    	} else {
    		this.container.filters = [];
    	}
    }

    resizeFitContent() {
    	this.background.width = this.content.width + this.padding * 2;
    	this.background.height = this.content.height + this.padding * 2;

    	this.border.cacheAsBitmap = false;
    	this.border.position.set(this.padding / 2, this.padding / 2);
    	this.border.clear();
    	this.border
    		.lineStyle(1, 0x655a61)
    		.moveTo(0, 0)
    		.lineTo(this.content.width + this.padding, 0)
    		.lineTo(
    			this.content.width + this.padding,
    			this.content.height + this.padding
    		)
    		.lineTo(0, this.content.height + this.padding)
    		.lineTo(0, 0);
    	this.border.cacheAsBitmap = true;
    }
}
