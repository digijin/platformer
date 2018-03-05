import Bullet from "../../GameObject/Bullet";

export default class LaserBullet extends Bullet {
	constructor(params) {
		// params.dir += (Math.random() - 0.5) / 4; //spread
		super(params);
		this.color = 0x1178b3;
		this.lineWidth = 2;
		this.speed = 5000;
	}
}
