// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import Panel from "./Panel";

import * as PIXI from "pixi.js";

export default class BriefingManager extends GameObject {
    container: PIXI.Container;
    missionPanel: PIXI.Container;
    panelPadding: number = 10;
    init(engine: Engine) {
        super.init(engine);
        this.container = new PIXI.Container();
        this.container.position.x = this.engine.renderer.width / 2;
        this.container.position.y = this.engine.renderer.height / 2;

        this.missionPanel = new PIXI.Container();
        this.missionPanelContent = new PIXI.Container();
        this.missionPanelBg = new PIXI.Container();
        this.missionPanel.addChild(this.missionPanelBg);
        this.missionPanel.addChild(this.missionPanelContent);

        this.missionPanelContent.position = {
            x: this.panelPadding,
            y: this.panelPadding
        };

        this.container.addChild(this.missionPanel);

        let spr = new PIXI.Sprite(PIXI.Texture.WHITE);
        spr.tint = 0x221d1f;
        spr.width = 100;
        spr.height = 100;

        let text = new PIXI.Text("Available Missions", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0xc9d3d0,
            align: "center"
        });

        // spr.buttonMode = true;
        // spr.interactive = true;
        this.missionPanelBg.addChild(spr);
        this.missionPanelContent.addChild(text);
        spr.on("mousedown", event => {
            //handle event
            console.log(event);
        });
        this.container.on("mousedown", event => {
            //handle event
            console.log(event);
        });

        this.engine.stage.addChild(this.container);
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }

    update() {
        // this.container.position.x += this.engine.deltaTime * 20;
        this.missionPanelBg.width =
            this.missionPanelContent.width + this.panelPadding * 2;
        this.missionPanelBg.height =
            this.missionPanelContent.height + this.panelPadding * 2;
    }
}
