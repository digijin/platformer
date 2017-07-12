
export class Bullet{
    x:number;//position
    y:number;//position
    h:number;//momentum
    v:number;//momentum
    constructor(params){
        Object.assign(this, params);
        this.time = 1
    }
    update = ({ctx, deltaTime}) => {
        this.time -= deltaTime;
        this.x += this.h;
        this.y += this.v;
        // shell.v += 0.01;
        ctx.fillRect(this.x, this.y, 4, 4);
        if(this.time < 0){
            this.destroy();
        }
    }
}
