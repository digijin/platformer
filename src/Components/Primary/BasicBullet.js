import Bullet from "../../GameObject/Bullet";

export default class BasicBullet extends Bullet {
    constructor(params) {
        params.dir += (Math.random() - 0.5) / 4; //spread
        super(params);
        this.speed = 2000;
    }
}
