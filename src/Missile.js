//@flow

import missile from './missile.png'
import Smoke from 'Smoke'
import Explosion from 'Explosion'
import Point from 'Point'

import config from 'config'

import type Engine from 'Engine'

export default class Missile {
    position: Point;
    direction: number;
    target: Point;
    speed: number
    constructor(params: { position: Point, direction: number, target: Point }) {
        Object.assign(this, params);
        this.speed = 1;
        this.guided = true;
    }
    explode({ register }) {
        this.destroy();

        for (let i = 0; i < 10; i++) {
            //we want red outlines to be on the outside
            //pick a direction
            let dir = Math.random() * Math.PI * 2;
            let dist = Math.random() * 20;
            let offset = { x: Math.cos(dir) * dist, y: Math.sin(dir) * dist };
            register(new Explosion({
                position: this.position.add(offset),
                rotation: dir,
                delay: Math.random() / 8
            }))
        }
    }
    update = (engine: Engine) => {

        this.position.y += Math.sin(this.direction) * this.speed;
        this.position.x += Math.cos(this.direction) * this.speed;

        let block = engine.grid.blockAtPosition(this.position);
        if (engine.grid.isPositionBlocked(this.position)) {
            this.explode(engine);
            engine.grid.destroyBlockAtPosition(this.position);
        }

        //smoke trail
        engine.register(new Smoke({ position: this.position.clone() }))

        //aim at target
        if (this.guided) {
            let diff = this.target.subtract(this.position);
            let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
            if (dist < 50) {
                this.guided = false
            }
            let newdir = Math.atan2(diff.y, diff.x);

            let dirDiff = this.direction - newdir;
            if (dirDiff > Math.PI)
                newdir += 2 * Math.PI
            if (dirDiff < -Math.PI)
                newdir -= 2 * Math.PI

            //recalculate now we have removed cyclic variance
            dirDiff = (newdir - this.direction)

            //TODO REMOVE HARDCODING
            if (Math.abs(dirDiff) < 0.5) {
                this.speed += engine.deltaTime * 8;
                this.direction += dirDiff / 3
            } else {
                this.speed -= engine.deltaTime * 5;
                // this.speed = (this.speed + 1) /2;
                if (dirDiff > 0) {
                    this.direction += engine.deltaTime * Math.PI
                } else {
                    this.direction -= engine.deltaTime * Math.PI
                }
            }
            if (this.speed < 1) this.speed = 1;
            if (this.speed > 8) this.speed = 8;

            //dont spin it up too much
            if (this.direction > Math.PI) this.direction -= Math.PI * 2
            if (this.direction < -Math.PI) this.direction += Math.PI * 2

        }

        engine.ctx.drawSprite(missile, this.position, { w: 20, h: 10 }, this.direction, { x: .2, y: .5 });


    }
}
