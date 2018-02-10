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
    props: Props;
    selectedMission: Mission | null;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;
    title: PIXI.DisplayObject;
    description: PIXI.DisplayObject;
    objectives: PIXI.Container;
    constructor(props: Props) {
        super();
        this.props = props;
    }
    init(engine: Engine) {
        super.init(engine);
        // console.log(this.props);
        this.container.position = this.props.offset;
        this.heading = new PIXI.Text("Info Panel", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.title = new PIXI.Text("title", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });

        this.description = new PIXI.Text("desc", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.objectives = new PIXI.Container();

        this.content.addChild(this.heading);
        this.content.addChild(this.title);
        this.content.addChild(this.description);
        this.content.addChild(this.objectives);

        this.render({
            title: "None Selected",
            description: "Please select a mission",
            objectives: []
        });

        // this.resizeFitContent();
    }

    render(mission: Mission) {
        let cursor = 30;
        this.title.text = mission.title;
        this.title.position.y = cursor;
        cursor += 20;
        this.description.text = mission.description;
        this.description.position.y = cursor;
        cursor += 20;
        this.objectives.position.y = cursor;
        this.objectives.children.slice().forEach(child => {
            //wipe it
            this.objectives.removeChild(child);
        });
        let spr = new PIXI.Sprite(PIXI.Texture.WHITE);
        spr.position.x = Math.random() * 100;
        spr.position.y = Math.random() * 100;
        this.objectives.addChild(spr);
        mission.objectives.forEach((o, i) => {
            let text = new PIXI.Text(o.text, {
                fontFamily: "Arial",
                fontSize: 18,
                fill: this.textColor,
                align: "center"
            });
            text.position.y = i * 20 + 10;
            this.objectives.addChild(text);
        });
        this.resizeFitContent();
    }

    update() {
        super.update();
    }
}
