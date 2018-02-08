// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import MissionsPanel from "./MissionsPanel";
import { Missions } from "Mission";

import * as PIXI from "pixi.js";

import Point from "Utility/Point";

export default class BriefingManager extends GameObject {
    container: PIXI.Container;
    missionsPanel: MissionsPanel;
    panelPadding: number = 10;
    init(engine: Engine) {
        super.init(engine);
        this.container = new PIXI.Container();

        this.missionsPanel = new MissionsPanel({
            onMissionChange: this.onMissionChange
        });
        this.engine.register(this.missionsPanel);
        this.container.addChild(this.missionsPanel.container);

        this.container.position.x = this.engine.renderer.width / 2;
        this.container.position.y = this.engine.renderer.height / 2;

        this.engine.stage.addChild(this.container);
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }
    onMissionChange(mission) {
        console.log("mission changed to", mission);
    }

    update() {
        let target = new Point({
            x: (this.engine.renderer.width - this.container.width) / 2,
            y: (this.engine.renderer.height - this.container.height) / 2
        });
        this.container.position = target;
    }
}
