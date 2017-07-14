const hSpeed = 150;

import Point from 'Point'
import Missile from 'Missile';
import Bullet from 'Bullet';
import Shell from 'Shell';
import mech from './mech.png'
let firing = false;
let missile = false

document.addEventListener("mousedown", (e) => {
    switch(e.button){
        case 0:
            firing = true;
        break;
        case 2: 
            missile = true;
        break;
    }
})
document.addEventListener("mouseup", (e) => {
    switch(e.button){
        case 0:
            firing = false;
        break;
    }
})

export default class Player{
    position: Point;
    constructor(params){
        Object.assign(this, params);
    }
    update({ctx, mouse, keyboard, deltaTime, register}){
        /* 
        w 87
        a 65
        s 83
        d 68
        */
        if(missile){
            missile = false;
            register(new Missile({
                direction: -Math.PI/2,
                speed: 3,
                position: this.position.clone(),
                target: mouse.position.clone()
            }));
        }
        if(firing){
            register(new Shell({
                x: this.position.x,
                y: this.position.y,
                h: Math.random()-0.5,
                v: -Math.random()
            }))
            let diff = mouse.position.subtract(this.position);
            let dir = Math.atan2(diff.y, diff.x)
            dir += (Math.random()-0.5)/10 //spread
            register(new Bullet({
                x: this.position.x,
                y: this.position.y,
                // h: 10+Math.random(),
                // v: (Math.random()-0.5)/3
                h:Math.cos(dir)*10,
                v:Math.sin(dir)*10
            }))

        }

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