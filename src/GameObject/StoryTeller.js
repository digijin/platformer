import GameObject from "GameObject";

import Doors from "Transition/Doors";
import MainMenu from "Scene/MainMenu";
import Results from "Scene/Results";
export default class StoryTeller extends GameObject {
    update() {
        // console.log(this.engine.stage.position, this.engine.view.offset)
        // this.engine.stage.position = this.engine.view.offset.multiply(-1)
        this.engine.stage.position.x = Math.floor(-this.engine.view.offset.x);
        this.engine.stage.position.y = Math.floor(-this.engine.view.offset.y);

        if (this.engine.objectsTagged("enemy").length == 0) {
            console.log("ran out of enemies");
            this.engine.startSceneTransition(new Results(), new Doors());
        }
    }
}
