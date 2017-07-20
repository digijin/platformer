import Point from 'Point'
import type Engine from 'Engine'

import smoke from './smoke.png'

export default class Smoke{
	position: Point;
	time: number //life
    constructor(params){
        Object.assign(this, params);
        this.time = 1
        this.rotation = Math.random()*Math.PI*2
    }
    update = (engine:Engine) => {
        this.time -= engine.deltaTime;
        
        // ctx.fillRect(this.position.x, this.position.y, 4, 4);
        let w = 20
        let h = 20
        h*= this.time;
        w*= this.time
        // ctx.translate(this.position.x, this.position.y);
        // ctx.rotate(this.rotation)
        // ctx.drawImage(smoke, 0, 0, smoke.width, smoke.height, -w/2, -h/2, w, h);
        // ctx.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate
        engine.ctx.drawSprite(smoke, this.position, {w,h}, this.rotation)

        if(this.time < 0){
            this.destroy();
        }
    }
}
