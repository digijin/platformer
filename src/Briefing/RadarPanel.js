// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

import radar from "./images/radar.png";

type Props = {};

export default class ImagePanel extends Panel {
    heading: PIXI.Text;
    props: Props;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    constructor(props: Props) {
        super(props);
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.container.position = this.props.offset;
        this.image = new PIXI.Sprite(
            new PIXI.Texture(new PIXI.BaseTexture(radar))
        );

        this.content.addChild(this.image);
        this.resizeFitContent();
    }

    update() {
        super.update();
    }
}
