/// @flow
import GameObject from "GameObject";

import Header from "./SideMenu/Header";

import * as PIXI from "pixi.js";

export default class SideMenu extends GameObject {
    container: PIXI.Container;

    constructor() {
    	super();
    }

    init() {
    	this.container = new PIXI.Container();
    	this.header = new Header();
    	this.container.addChild(this.header);
    	this.background = new PIXI.Container();
    	this.container.addChild(this.background);
    	this.border = new PIXI.Graphics();
    	this.background.addChild(this.border);
    	this.resize();
    }

    resize() {
    	const width = 300;
    	const height = window.innerHeight;
    	const padding = 10;

    	this.border.cacheAsBitmap = false;
    	this.border.position.set(10, 10);
    	this.border.clear();
    	this.border
    		.lineStyle(1, 0x655a61)
    		.moveTo(0, 0)
    		.lineTo(width, 0)
    		.lineTo(width, height - padding)
    		.lineTo(0, height - padding)
    		.lineTo(0, 0);
    	this.border.cacheAsBitmap = true;
    }
}