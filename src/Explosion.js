
import explosion from './explosion.png'

import Point from 'Point';

export default class Explosion{
    position:Point
	time: number //life
    constructor(params){

        //defaults
        this.time = 1;
        // this.rotation = Math.random()*Math.PI*2
        this.delay = 0;//Math.random()/2;
        this.size = 20 + (Math.random()*20);

        Object.assign(this, params)
    }
    update({ctx, deltaTime}){
        if(this.delay > 0){
            this.delay -= deltaTime
        }else{
            this.time -= deltaTime;

            let scale = Math.sin(this.time * Math.PI)

            ctx.drawSprite(explosion, 
                this.position, 
                {w:this.size*scale, h:this.size*scale}, 
                this.rotation);

            // ctx.globalAlpha = this.time;
            // ctx.globalAlpha = 1
            if(this.time < 0){
                this.destroy();
            }
        }
        
    }
}