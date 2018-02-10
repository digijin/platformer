// @flow
import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import type Engine from "Engine";

import GameObject from "GameObject";
type Props = {
    offset: Point,
    z: number
};

export default class Panel extends GameObject {
    container: PIXI.Container;
    content: PIXI.Container;
    background: PIXI.Container;

    padding: number = 20;
    props: Props;

    constructor(props: Props) {
        super();
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.setupContainers();
        // this.position();
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
        this.background.addChild(spr);
    }
    position() {
        this.container.position = this.props.offset.multiply(1 + this.props.z);
        this.container.scale.x = 1 + this.props.z;
        this.container.scale.y = 1 + this.props.z;
    }

    update() {
        // if (this.props.delay > 0) {
        //     this.props.delay -= this.engine.deltaTime * 4;
        //     // this.container.alpha = 0
        //     this.container.visible = false;
        // } else {
        this.container.visible = true;
        this.props.z *= 1 - this.engine.deltaTime;
        // if (this.props.z < 0) {
        //     this.props.z += this.engine.deltaTime;
        // }
        this.position();
        // }
    }

    resizeFitContent() {
        this.background.width = this.content.width + this.padding * 2;
        this.background.height = this.content.height + this.padding * 2;
    }
}
