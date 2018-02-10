// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";
import { Missions } from "Mission";
import type Point from "Utility/Point";

import type Mission from "Mission";

type Props = {
    onMissionChange: mission => {},
    offset: Point,
    z: number
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
        super(props);
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        this.heading = new PIXI.Text("Available Missions", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.content.addChild(this.heading);
        this.addMissionButtons();
        this.resizeFitContent();
    }

    addMissionButtons() {
        this.missionButtons = Missions.map((mission, index) => {
            let text = new PIXI.Text(mission.title, {
                fontFamily: "Arial",
                fontSize: 18,
                fill: this.textColor,
                align: "center"
            });

            text.buttonMode = true;
            text.interactive = true;
            text.mission = mission;
            text.on("mousedown", event => {
                this.selectedMission = mission;
                this.props.onMissionChange(mission);
            });
            text.position.y = 30 + index * 20;
            this.content.addChild(text);
            return text;
        });
    }

    update() {
        super.update();
        this.missionButtons.forEach(mb => {
            if (mb.mission == this.selectedMission) {
                mb.style.fill = this.textColorSelected;
            } else {
                mb.style.fill = this.textColor;
            }
        });
    }
}
