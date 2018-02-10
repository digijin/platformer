// @flow

import GameObject from "GameObject";

import * as PIXI from "pixi.js";
import type Engine from "Engine";
import Panel from "./Panel";

import Button from "./Button";

import Point from "Utility/Point";

// type Props = { offset: Point };
import Equip from "Scene/Equip";
import MainMenu from "Scene/MainMenu";
import Doors from "Transition/Doors";

export default class ActionPanel extends Panel {
    heading: PIXI.Text;
    // props: Props;

    textColor: number = 0xc9d3d0;
    textColorOver: number = 0xffffff;
    textColorSelected: number = 0xff6666;

    equipButton: Button;
    exitButton: Button;
    // constructor(props: Props) {
    //     super();
    //     this.props = props;
    // }
    init(engine: Engine) {
        super.init(engine);
        // this.container.position = this.props.offset;
        this.heading = new PIXI.Text("Action Panel", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: this.textColor,
            align: "center"
        });
        this.content.addChild(this.heading);

        this.equipButton = new Button({ text: "Equip" });
        this.equipButton.position.y = 30;
        this.equipButton.on("mouseup", () => {
            this.engine.startSceneTransition(new Equip(), new Doors());
        });
        this.exitButton = new Button({ text: "Exit to menu" });
        this.exitButton.position.y = 70;
        this.exitButton.on("mouseup", () => {
            this.engine.startSceneTransition(new MainMenu(), new Doors());
        });
        this.content.addChild(this.equipButton);
        this.content.addChild(this.exitButton);
        this.resizeFitContent();
    }

    update() {
        super.update();
    }
}
