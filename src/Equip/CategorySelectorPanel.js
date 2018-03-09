import Button from "../Briefing/Button";
import GameObject from "GameObject";

import type Engine from "Engine";

import * as PIXI from "pixi.js";

import { CATEGORY } from "Component";

const Categories = [
	CATEGORY.ENGINE,
	CATEGORY.LEGS,
	CATEGORY.PRIMARY,
	CATEGORY.SECONDARY,
	CATEGORY.SIDEKICK,
	CATEGORY.BODY,
	CATEGORY.BOOSTER
];

export default class CategorySelectorPanel extends GameObject {
    container: PIXI.Container;
    _onSelect: () => {};
    init(engine: Engine) {
    	super.init(engine);

    	this.container = new PIXI.Container();

    	this.buttons = Categories.map((c, i) => {
    		let button = new Button({ text: c });
    		this.container.addChild(button);
    		button.position.y = button.height * i;
    		button.on("mouseup", () => {
    			this._onSelect(c);
    		});
    	});
    }

    onSelect(func) {
    	this._onSelect = func;
    }
}
