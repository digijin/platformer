
export class Shell{
    x:number;//position
    y:number;//position
    h:number;//momentum
    v:number;//momentum
    constructor(params){
        Object.assign(this, params);
        this.time = 1 + Math.random();
    }
    update({ctx, deltaTime}){
        this.time -= deltaTime;
        this.x += this.h;
        this.y += this.v;
        this.v *= 1-deltaTime
        this.v += deltaTime*3;
        ctx.fillRect(this.x, this.y, 4, 4);
        //TODO DETECT GROUND PROPER LIKE
        if(this.y>250 && this.v>0){
            this.v = -this.v;
        }
        if(this.time < 0){
            this.destroy();
        }
    }
}