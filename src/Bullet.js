//@flow

import type Engine from 'Engine'
import GameObject from 'GameObject'
export default class Bullet extends GameObject {
    x: number;//position
    y: number;//position
    h: number;//momentum
    v: number;//momentum
    time: number;
    constructor(params: Object) {
        super(params)
        Object.assign(this, params);
        this.time = 1
    }
    update = (engine: Engine) => {
        this.time -= engine.deltaTime;
        this.x += this.h;
        this.y += this.v;
        engine.ctx.fillRect(this.x, this.y, 4, 4);
        if (this.time < 0) {
            this.destroy();
        }
        let block = engine.grid.blockAtPosition({ x: this.x, y: this.y });
        if (engine.grid.isPositionBlocked({ x: this.x, y: this.y })) {
            this.destroy();
        }
    }
}
