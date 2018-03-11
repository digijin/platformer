// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

// import radar from "./images/radar.png";

type Props = {};

export default class BarPanel extends Panel {
    props: Props;
    numvalues: number = 25;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    graph: PIXI.Graphics;
    height: number = 60;
    heading: PIXI.Text;

    gap: number = 0.1;
    time: number = 0;
    values: Array<number> = [];
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
    	}
    	this.drawLines();

    	this.content.addChild(this.graph);
    	this.resizeFitContent();
    }

    update() {
    	super.update();
    	this.time += this.engine.deltaTime;
    	if (this.time > this.gap) {
    		this.time -= this.gap;
    		this.values.push(Math.random());
    		if (this.values.length > this.numvalues) {
    			this.values.shift();
    		}
    		this.drawLines();
    	}
    }

    drawLines() {
    	this.graph.clear();
    	this.graph.lineStyle(3, 0x00ff00);
    	// for (let x = 0; x < 20; x++) {
    	for (let x = 0; x < this.values.length; x++) {
    		this.graph
    			.moveTo(x * 5, this.height)
    			.lineTo(x * 5, this.height * this.values[x]);
    	}
    }
}
