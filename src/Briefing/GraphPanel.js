// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

// import radar from "./images/radar.png";

type Props = {};

export default class ImagePanel extends Panel {
    heading: PIXI.Text;
    props: Props;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    graph: PIXI.Graphics;
    constructor(props: Props) {
        super(props);
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.container.position = this.props.offset;
        // this.image = new PIXI.Sprite(
        //     new PIXI.Texture(new PIXI.BaseTexture(radar))
        // );
        //
        // this.content.addChild(this.image);
        this.graph = new PIXI.Graphics();
        this.graph.lineStyle(1, 0x00ff00).moveTo(0, 100);
        for (let x = 0; x < 20; x++) {
            this.graph.lineTo(x * 5, 100 * Math.random());
        }
        this.graph.cacheAsBitmap = true;
        this.content.addChild(this.graph);
        this.resizeFitContent();
    }

    update() {
        super.update();
    }
}
