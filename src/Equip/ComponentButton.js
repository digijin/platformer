import * as PIXI from "pixi.js";

import GameObject from "GameObject";

import RGBA from "Utility/RGBA";

import log from "loglevel";

export default class Button extends GameObject {
    textColorDefault: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    backgroundColorDefault: number = 0x555555;
    backgroundColorOver: number = 0x999999;
    backgroundColorSelected: number = 0x222222;

    textColor: number = this.textColorDefault;
    backgroundColor: number = this.backgroundColorDefault;

    padding: { x: number, y: number } = { x: 10, y: 2 };

    container: PIXI.Container;

    over: boolean = false;
    constructor(params: {
        component: { id: string, name: string },
        text: string,
        action: any,
        category: string
    }) {
    	super();
    	this.category = params.category;
    	this.component = params.component;
    	this.container = new PIXI.Container();
    	this.container.buttonMode = true;
    	this.container.interactive = true;

    	this.text = new PIXI.Text(params.text, {
    		fontFamily: "Arial",
    		fontSize: 24,
    		fill: this.textColorDefault,
    		align: "center"
    	});
    	this.text.position = this.padding;
    	this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.background.tint = this.backgroundColorDefault;
    	this.background.width = this.text.width + this.padding.x * 2;
    	this.background.height = this.text.height + this.padding.y * 2;
    	this.container.addChild(this.background);
    	this.container.addChild(this.text);

    	this.container.on("mousedown", e => {
    		// console.log("md");
    	});
    	this.container.on("mouseover", e => {
    		// console.log("mo");
    		this.over = true;
    	});
    	this.container.on("mouseout", e => {
    		// console.log("mo");
    		this.over = false;
    	});
    }

    update() {
    	const selected = this.engine.currentPlayer[this.category];
    	// log.info(selected, this.component.id);
    	let textcolor = this.textColorDefault;
    	let bgcolor = this.backgroundColorDefault;

    	if (selected == this.component.id) {
    		textcolor = this.textColorSelected;
    		bgcolor = this.backgroundColorSelected;
    	} else if (this.over) {
    		textcolor = this.textColorOver;
    		bgcolor = this.backgroundColorOver;
    	} else {
    		textcolor = this.textColorDefault;
    		bgcolor = this.backgroundColorDefault;
    	}
    	// RGBA.fromNumber(textcolor);
    	this.textColor = RGBA.fromNumber(textcolor)
    		.percentTo(RGBA.fromNumber(this.textColor), 0.95)
    		.toNumber();
    	this.backgroundColor = RGBA.fromNumber(bgcolor)
    		.percentTo(RGBA.fromNumber(this.backgroundColor), 0.95)
    		.toNumber();

    	this.text.style.fill = this.textColor;
    	this.background.tint = this.backgroundColor;
    }
}
