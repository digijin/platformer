import Bullet from "../../GameObject/Bullet";

export default class GaussBullet extends Bullet {
	constructor(params) {
		// params.dir += (Math.random() - 0.5) / 4; //spread
		super(params);
		this.speed = 10000;
		this.damage = 100;
	}
}
