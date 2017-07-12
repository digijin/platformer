
export class Player{
    position: Point;
    constructor(params){
        Object.assign(this, params);
    }
    update({ctx, keyboard, deltaTime}){
        /* 
        w 87
        a 65
        s 83
        d 68
        */

        if(keyboard.down(65)){
            this.position.x -= deltaTime*100;
        }
        if(keyboard.down(68)){
            this.position.x += deltaTime*100;
        }
        ctx.fillRect(this.position.x, this.position.y, 50, 50);
    }
