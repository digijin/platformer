import Bullet from "../../GameObject/Bullet";

export default class FlameBullet extends Bullet {
	constructor(params) {
		params.dir += (Math.random() - 0.5) / 2; //spread
		super(params);
		this.color = 0xc92f27;
		this.lineWidth = 10;
		this.speed = 500;
		this.time = 0.5;
	}
}
