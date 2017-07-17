
import explosion from './explosion.png'

import Point from 'Point';

export default class Explosion{
    position:Point
	time: number //life
    constructor(params){
        Object.assign(this, params)
        this.time = 1;
        this.rotation = Math.random()*Math.PI*2
    }
    update({ctx, deltaTime}){
        this.time -= deltaTime;

        ctx.globalAlpha = this.time;
        ctx.drawSprite(explosion, this.position, {w:30, h:30}, this.rotation);
        ctx.globalAlpha = 1
        if(this.time < 0){
            this.destroy();
        }
    }
}