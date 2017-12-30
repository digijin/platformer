import GameObject from "GameObject";

import Doors from "Transition/Doors";
import MainMenu from "Scene/MainMenu";
import Results from "Scene/Results";
export default class StoryTeller extends GameObject {
	update() {
		if (this.engine.objectsTagged("enemy").length == 0) {
			this.engine.startSceneTransition(new Results(), new Doors());
		}
	}
}
