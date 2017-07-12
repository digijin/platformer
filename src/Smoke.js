import Point from 'Point'

export default class Smoke{
	position: Point;
	time: number //life
    constructor(params){
        Object.assign(this, params);
        this.time = 1
    }
    update = ({ctx, deltaTime}) => {
        this.time -= deltaTime;
        ctx.fillRect(this.x, this.y, 4, 4);
        if(this.time < 0){
            this.destroy();
        }
    }
}
