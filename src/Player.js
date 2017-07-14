const hSpeed = 150;

import mech from './mech.png'

export default class Player{
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
            this.position.x -= deltaTime*hSpeed;
        }
        if(keyboard.down(68)){
            this.position.x += deltaTime*hSpeed;
        }
        
        // ctx.fillRect(this.position.x, this.position.y, 50, 50);
        // ctx.drawImage(mech, 0, 0, mech.width, mech.height, this.position.x, this.position.y, 50, 50);
        ctx.drawSprite(mech, this.position, {w:100, h:100}, 0, {x:.5, y:1});
    }
}