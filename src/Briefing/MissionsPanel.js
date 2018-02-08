// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";
import { Missions } from "Mission";

export default class BriefingMissionsPanel extends Panel {
    heading: PIXI.Text;
    missionButtons: Array<PIXI.DisplayObject>;
    constructor(props) {
        super();
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.heading = new PIXI.Text("Here is my heading", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0xc9d3d0,
            align: "center"
        });
        this.content.addChild(this.heading);
        this.addMissionButtons();
        this.resizeFitContent();
    }

    addMissionButtons() {
        Missions.forEach((mission, index) => {
            let text = new PIXI.Text(mission.title, {
                fontFamily: "Arial",
                fontSize: 18,
                fill: 0xc9d3d0,
                align: "center"
            });

            text.buttonMode = true;
            text.interactive = true;
            text.on("mousedown", event => {
                console.log("text down", mission);
            });
            text.position.y = 30 + index * 20;
            this.content.addChild(text);
        });
    }
}
