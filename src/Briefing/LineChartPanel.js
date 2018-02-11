// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

// import radar from "./images/radar.png";

type Props = {};

export default class BarPanel extends Panel {
    heading: PIXI.Text;
    props: Props;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    graph: PIXI.Graphics;
    height: number = 60;
    numvalues: number = 25;
    pointGap: number = 10;
    speed: number = 0.5;
    constructor(props: Props) {
        super(props);
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.container.position = this.props.offset;
        this.graph = new PIXI.Graphics();

        //prime lineS
        for (let i = 0; i < this.numvalues; i++) {
            this.values.push(Math.random());
            this.targetValues.push(Math.random());
        }
        this.drawLines();

        this.content.addChild(this.graph);
        this.resizeFitContent();
    }
    drawLines() {
        this.graph.clear();
        this.graph
            .lineStyle(3, 0x00ff00)
            .moveTo(0, this.height * this.values[0]);
        // for (let x = 0; x < 20; x++) {
        for (let x = 0; x < this.values.length; x++) {
            // debugger;
            let v = this.values[x];
            let t = this.targetValues[x];
            if (v < t) {
                v += this.engine.deltaTime * this.speed;
            } else {
                v -= this.engine.deltaTime * this.speed;
            }
            // console.log(v, this.values[x], t, this.targetValues[x]);
            this.values[x] = v;
            if (Math.abs(v - t) < 0.1) {
                this.targetValues[x] = Math.random();
            }
            this.graph
                // .moveTo(x * this.pointGap, this.height)
                .lineTo(x * this.pointGap, this.height * this.values[x]);
        }
    }
    values: Array<number> = [];
    targetValues: Array<number> = [];
    update() {
        super.update();

        this.drawLines();
    }
}
