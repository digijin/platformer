// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import { GlitchFilter } from "@pixi/filter-glitch";
import { OldFilmFilter } from "@pixi/filter-old-film";
import { CRTFilter } from "@pixi/filter-crt";
import { ZoomBlurFilter } from "@pixi/filter-zoom-blur";
// import Doors from "Transition/Doors";
import Level from "Scene/Level";

import * as PIXI from "pixi.js";

import front from "./front.png";

import Point from "Utility/Point";

import Button from "../Briefing/Button";

import log from "loglevel";

import CategorySelectorPanel from "./CategorySelectorPanel";
import ComponentSelectorPanel from "./ComponentSelectorPanel";

export default class EquipManager extends GameObject {
    container: PIXI.Container;
    categorySelectorPanel: CategorySelectorPanel;
    launchButton: Button;
    image: PIXI.Sprite;
    init(engine: Engine) {
        super.init(engine);
        this.tag("equipmanager");
        this.container = new PIXI.Container();

        this.categorySelectorPanel = new CategorySelectorPanel();
        this.engine.register(this.categorySelectorPanel);
        this.container.addChild(this.categorySelectorPanel.container);
        this.categorySelectorPanel.container.position.x = 300;

        this.categorySelectorPanel.onSelect(category => {
            log.info("category selected", category);
            this.showComponentSelector(category);
        });

        // let bt = new PIXI.BaseTexture();
        // bt._loadSvgSourceUsingString(front);
        // this.image = new PIXI.Sprite(
        //     // new PIXI.Texture(new PIXI.BaseTexture(front))
        //     // PIXI.Texture.fromImage("data:image/svg+xml;charset=utf8," + front)
        //     new PIXI.Texture(bt)
        // );
        // debugger;
        // var texture = PIXI.Texture.fromImage(
        //     "data:image/svg+xml;charset=utf8," + front
        // );
        this.image = new PIXI.Sprite(
            new PIXI.Texture(new PIXI.BaseTexture(front))
        );
        // this.engine.stage.addChild(this.bg);
        this.container.addChild(this.image);

        this.launchButton = new Button({ text: "Launch" });
        this.launchButton.position.y = 200;
        this.launchButton.on("mouseup", () => {
            log.debug("EquipManager launchButton mouseup");
            // this.engine.startSceneTransition(new Level(), new Doors());
            this.engine.startScene(new Level());
        });
        this.container.addChild(this.launchButton);

        // this.bg.filters = [new OldFilmFilter({ sepia: 0, noise: 0.1 })];
        //container
        // this.container.position.x = this.engine.renderer.width / 2;
        // this.container.position.y = this.engine.renderer.height / 2;

        this.engine.stage.addChild(this.container);
    }

    componentSelector: ComponentSelectorPanel;
    showComponentSelector(category: string) {
        //cleanup
        if (this.componentSelector) {
            this.removeComponentSelector();
        }
        this.componentSelector = new ComponentSelectorPanel(category);
        this.componentSelector.onSelect(component => {
            log.info("selected component", component);
        });
        this.engine.register(this.componentSelector);
        this.container.addChild(this.componentSelector.container);

        this.componentSelector.container.position.x = 500;
    }
    removeComponentSelector() {
        this.container.removeChild(this.componentSelector.container);
        this.componentSelector.destroy();
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }

    update() {}
}
