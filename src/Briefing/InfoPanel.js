// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";
import { Missions } from "Mission";

import type Mission from "Mission";

import Point from "Utility/Point";

type Props = {
    offset: Point
};

export default class BriefingMissionsPanel extends Panel {
    heading: PIXI.Text;
    missionButtons: Array<PIXI.DisplayObject>;
    props: Props;
    selectedMission: Mission | null;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    constructor(props: Props) {
        super();
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        console.log(this.props);
        this.container.position = this.props.offset;
        this.heading = new PIXI.Text("Info Panel", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.content.addChild(this.heading);
        this.resizeFitContent();
    }

    update() {}
}
