import Missile from "../../GameObject/Missile";

export default class GuidedMissile extends Missile {
	constructor(params) {
		super(params);
		this.remoteControl = true;
	}
}
