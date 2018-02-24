import Button from "../Briefing/Button";
import GameObject from "GameObject";

import type Engine from "Engine";

import * as PIXI from "pixi.js";

const Categories = [
    "engine",
    "legs",
    "primary",
    "secondary",
    "sidekick",
    "armour",
    "booster"
];

export default class CategorySelectorPanel extends GameObject {
    container: PIXI.Container;
    init(engine: Engine) {
        super.init(engine);

        this.container = new PIXI.Container();

        this.buttons = Categories.map((c, i) => {
            let button = new Button({ text: c });
            this.container.addChild(button);
            button.position.y = button.height * i;
        });
    }
}
