import Base from "./Base";

import type Engine from "Engine";

import Manager from "Briefing/Manager";

export default class Briefing extends Base {
    start(engine: Engine) {
        super.start(engine);

        engine.register(new Manager());

        document.body.style.backgroundColor = "#0e0405";
        engine.ui.dispatch({ type: "START_SCENE", scene: "briefing" });
    }
}
