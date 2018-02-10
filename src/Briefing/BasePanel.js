// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

type Props = {};

export default class BasePanel extends Panel {
    heading: PIXI.Text;
    props: Props;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    constructor(props: Props) {
        super();
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.container.position = this.props.offset;
        this.heading = new PIXI.Text("Base Panel", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.content.addChild(this.heading);
        this.resizeFitContent();
    }

    update() {
        super.update();
    }
}
