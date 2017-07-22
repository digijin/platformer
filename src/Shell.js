//@flow

import Point from 'Point'


export default class Shell{
    position: Point;
    h:number;//momentum
    v:number;//momentum
    constructor(params:Object){
        Object.assign(this, params);
        this.time = 1 + Math.random();
    }
    update({ctx, deltaTime, grid}){
        this.time -= deltaTime;
        this.position.x += this.h;
        this.position.y += this.v;
        this.v *= 1-deltaTime
        this.v += deltaTime*3;
        ctx.fillRect(this.position.x, this.position.y, 4, 4);
        //TODO DETECT GROUND PROPER LIKE
        if(grid.isPositionBlocked(this.position) && this.v>0){
        // if(this.position.y>250 && this.v>0){
            this.v = -this.v;
        }
        if(this.time < 0){
            this.destroy();
        }
    }
}