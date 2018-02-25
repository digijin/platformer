import Button from "../Briefing/Button";
import GameObject from "GameObject";

import type Engine from "Engine";

import * as PIXI from "pixi.js";

import { Engines } from "Components/Engine";
import { Legs } from "Components/Legs";
import { Primarys } from "Components/Primary";

export default class ComponentSelectorPanel extends GameObject {
    container: PIXI.Container;
    category: string;
    options: Array<any>;
    constructor(category) {
        super();
        this.category = category;
        this.options = [];
        switch (category) {
            case "engine":
                this.options = Engines.map(e => e.name);
                break;
            case "legs":
                this.options = Legs.map(e => e.name);
                break;
            case "primary":
                this.options = Primarys.map(e => e.name);
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
            let button = new Button({ text: c });
            this.buttonContainer.addChild(button);
            button.position.y = button.height * i;
            button.on("mouseup", () => {
                this._onSelect(c);
            });
        });
    }
    _onSelect: () => {};
    onSelect(func) {
        this._onSelect = func;
    }
}
