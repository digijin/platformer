import Button from "./ComponentButton";
import GameObject from "GameObject";

import type Engine from "Engine";

import * as PIXI from "pixi.js";

import { Engines } from "Components/Engine";
import { Legs } from "Components/Legs";
import { Primarys } from "Components/Primary";
import { Secondarys } from "Components/Secondary";
import { Sidekicks } from "Components/Sidekick";
import { Bodys } from "Components/Body";
import { Boosters } from "Components/Booster";

export default class ComponentSelectorPanel extends GameObject {
    container: PIXI.Container;
    category: string;
    options: Array<any>;
    _onSelect: () => {};
    constructor(category) {
    	super();
    	this.category = category;
    	this.options = [];
    	switch (category) {
    	case "engine":
    		this.options = Engines;
    		break;
    	case "legs":
    		this.options = Legs;
    		break;
    	case "primary":
    		this.options = Primarys;
    		break;
    	case "secondary":
    		this.options = Secondarys;
    		break;
    	case "sidekick":
    		this.options = Sidekicks;
    		break;
    	case "body":
    		this.options = Bodys;
    		break;
    	case "booster":
    		this.options = Boosters;
    		break;
    	}
    }

    init(engine: Engine) {
    	super.init(engine);

    	this.container = new PIXI.Container();
    	this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.container.addChild(this.sprite);

    	this.heading = new PIXI.Text(this.category, {
    		fontFamily: "Arial",
    		fontSize: 24,
    		fill: 0xff1010,
    		align: "center"
    	});
    	this.container.addChild(this.heading);
    	this.buttonContainer = new PIXI.Container();
    	this.container.addChild(this.buttonContainer);
    	this.buttonContainer.position.y = 30;
    	this.buttons = this.options.map((c, i) => {
    		let button = new Button({
    			component: c,
    			text: c.name,
    			category: this.category
    		});
    		this.engine.register(button);
    		//TODO: also cleanup
    		this.buttonContainer.addChild(button.container);
    		button.container.position.y = button.container.height * i;
    		button.container.on("mouseup", () => {
    			this._onSelect(c);
    		});
    	});
    }

    onSelect(func) {
    	this._onSelect = func;
    }
}
