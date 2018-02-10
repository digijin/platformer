// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import MissionsPanel from "./MissionsPanel";
import InfoPanel from "./InfoPanel";
import ActionPanel from "./ActionPanel";
import BasePanel from "./BasePanel";

import * as PIXI from "pixi.js";

import Point from "Utility/Point";

export default class BriefingManager extends GameObject {
    container: PIXI.Container;
    missionsPanel: MissionsPanel;
    infoPanel: InfoPanel;
    spacing: number = 20;
    init(engine: Engine) {
        super.init(engine);
        this.container = new PIXI.Container();
        //MISSIONS
        this.missionsPanel = new MissionsPanel({
            offset: new Point(),
            z: -0.8,
            onMissionChange: this.onMissionChange,
            delay: 1
        });
        this.engine.register(this.missionsPanel);
        this.missionsPanel.props.offset.x =
            -this.missionsPanel.container.width - this.spacing;
        this.missionsPanel.props.offset.y =
            -this.missionsPanel.container.height - this.spacing;
        this.container.addChild(this.missionsPanel.container);
        //ACTIONS
        this.actionPanel = new ActionPanel({
            offset: new Point({
                x: 0,
                // y: this.missionsPanel.container.height + this.spacing
                y: 0
            }),
            z: -0.8,
            delay: 2
        });
        this.engine.register(this.actionPanel);
        this.actionPanel.props.offset.x =
            -this.actionPanel.container.width - this.spacing;
        this.container.addChild(this.actionPanel.container);
        //BASE
        this.basePanel = new BasePanel({
            offset: new Point({
                // x: this.missionsPanel.container.width + this.spacing,
                x: 0,
                y: 0
            }),
            z: -0.8,
            delay: 3
        });
        this.engine.register(this.basePanel);
        this.basePanel.props.offset.y =
            -this.basePanel.container.height - this.spacing;
        this.container.addChild(this.basePanel.container);
        //INFO
        this.infoPanel = new InfoPanel({
            offset: new Point({
                // x: this.missionsPanel.container.width + this.spacing,
                // y: this.basePanel.container.height + this.spacing
                x: 0,
                y: 0
            }),
            z: -0.8,
            delay: 4
        });
        this.engine.register(this.infoPanel);
        this.container.addChild(this.infoPanel.container);

        this.container.position.x = this.engine.renderer.width / 2;
        this.container.position.y = this.engine.renderer.height / 2;

        this.engine.stage.addChild(this.container);
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }
    onMissionChange = mission => {
        // console.log("mission changed to", mission);

        this.infoPanel.render(mission);
    };

    update() {
        let target = new Point({
            // x: (this.engine.renderer.width - this.container.width) / 2,
            // y: (this.engine.renderer.height - this.container.height) / 2
            x: this.engine.renderer.width / 2,
            y: this.engine.renderer.height / 2
        });

        this.container.position = target;
        // .easeTo(
        //     this.container.position,
        //     1 + this.engine.deltaTime
        // );
    }
}
