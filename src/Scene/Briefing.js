import Base from "./Base";

import type Engine from "Engine";

import Manager from "Briefing/Manager";

import Point from "Utility/Point";

export default class Briefing extends Base {
    start(engine: Engine) {
        super.start(engine);

        engine.stage.position.x = 0;
        engine.stage.position.y = 0;

        engine.view.offset = new Point({
            x: 0,
            y: 0
        });

        engine.register(new Manager());

        document.body.style.backgroundColor = "#0e0405";
        // engine.ui.dispatch({ type: "START_SCENE", scene: "briefing" });
    }
}
