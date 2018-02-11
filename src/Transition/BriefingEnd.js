//@flow
import type Engine from "Engine";
import Base from "./Base";

import * as PIXI from "pixi.js";

const SECS = 2;
// FLOWHACK
export default class BriefingEnd extends Base {
    frame: number = 0;
    time: number = 0;
    flash: PIXI.Graphics;
    init(engine: Engine) {
        this.tag("transition");
        super.init(engine);
        // this.engine.objectsTagged("briefingpanel").forEach(bp => {
        //     bp.z = 50;
        //     bp.props.delay = Math.random();
        // });
        // this.engine.objectsTagged("briefingmanager").forEach(bm => {
        //     bm.mouseControl = false;
        // });
        this.flash = new PIXI.Graphics();
        this.flash.beginFill(0xffffff).drawCircle(0, 0, 10);
        this.flash.x = window.innerWidth / 2;
        this.flash.y = window.innerHeight / 2;
        this.engine.stage.addChild(this.flash);
        this.manager = this.engine.objectsTagged("briefingmanager")[0];
    }
    swapped: boolean = false;
    update() {
        this.manager.container.transform.scale.x *= 0.9;
        this.manager.container.transform.scale.y *= 0.9;
        this.frame++;
        this.time += this.engine.deltaTime;
        if (this.time > SECS && !this.swapped) {
            this.endLastScene();
            this.startNextScene();
            this.swapped = true;
        } else if (this.time > SECS * 2) {
            this.end();
        }
    }
    end() {
        this.engine.stage.removeChild(this.flash);
        this.destroy();
    }
}
