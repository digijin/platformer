import GameObject from "../GameObject";

import * as PIXI from "pixi.js";

export default class EnergyBar extends GameObject {
    width: number = 50;
    height: number = 200;
    padding: number = 10;
    init(engine) {
        super.init(engine);
        this.container = new PIXI.Container();
        this.graph = new PIXI.Graphics();
        this.container.addChild(this.graph);
    }
    update() {
        this.graph.clear();
        this.graph
            .beginFill(0xdddddd)
            .drawRect(
                0,
                0,
                this.width + this.padding * 2,
                this.height + this.padding * 2
            )
            .beginFill(0xff0000)
            .drawRect(this.padding, this.padding, this.width, this.height);
    }
}
