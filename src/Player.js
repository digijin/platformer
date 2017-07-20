const hSpeed = 150;

import Point from 'Point'
import Missile from 'Missile';
import Bullet from 'Bullet';
import Shell from 'Shell';
import mech from './mech.png'

import config from 'config'

import Rect from 'Rect';

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
        case 2:
            missile = false;
        break;
    }
})

export default class Player{
    position: Point;
    constructor(params){
        Object.assign(this, params);
        this.size = config.player.size
        this.h = 0;
        this.v = 0;
        this.registration = {x:.5, y:1};
    }
    update({ctx, mouse, keyboard, deltaTime, register, grid, view}){

        //adjust camera
        view.offset = this.position.subtract({x:config.game.width/2, y:config.game.height/2})

        /* 
        w 87
        a 65
        s 83
        d 68
        */
        if(missile){
            // missile = false;
            register(new Missile({
                direction: (-Math.PI/2) + (Math.random()-0.5),
                speed: 3 + Math.random(),
                position: this.position.subtract({x:0,y:this.size.h}),
                target: mouse.position.clone()
            }));
        }
        if(firing){
            register(new Shell({
                x: this.position.x,
                y: this.position.y - (this.size.h/2),
                h: Math.random()-0.5,
                v: -Math.random()
            }))
            let diff = mouse.position.subtract(this.position);
            let dir = Math.atan2(diff.y, diff.x)
            dir += (Math.random()-0.5)/10 //spread
            register(new Bullet({
                x: this.position.x,
                y: this.position.y - (this.size.h/2),
                // h: 10+Math.random(),
                // v: (Math.random()-0.5)/3
                h:Math.cos(dir)*10,
                v:Math.sin(dir)*10
            }))

        }

        let rect = Rect.fromPosSizeRego(this.position, this.size, this.registration)


        if(keyboard.down(65)){
            this.h -= deltaTime*5;
            if(this.h<-1)this.h=-1
        }else if(keyboard.down(68)){
            this.h += deltaTime*5;
            if(this.h>1)this.h=1
        }else {
            this.h *= 1-(deltaTime*5);
        }

        //check walls
        let hDelta = this.h * deltaTime*hSpeed

        if(hDelta > 0){
            if( grid.blockAtPosition({x:rect.r + hDelta, y: rect.t}).block !== "0"||
                grid.blockAtPosition({x:rect.r + hDelta, y: rect.b}).block !== "0"){
                this.h = 0;
                hDelta = 0
            }
        }else{
            if( grid.blockAtPosition({x:rect.l + hDelta, y: rect.t}).block !== "0"||
                grid.blockAtPosition({x:rect.l + hDelta, y: rect.b}).block !== "0"){
                this.h = 0;
                hDelta = 0
            }

        }

        this.position.x += hDelta



        //VERTICAL MOVEMENT
        if(keyboard.down(32)){
            if(this.v == 0){
                this.v = -4//jump
            }
            this.v -= deltaTime*4; //BOOSTERS
        }else{
            this.v += deltaTime*8; //GRAVITY
        }
        
        this.position.y += this.v
        //LANDING
        let block = grid.blockAtPosition(this.position)
        if(block.block !== '0'){
            this.position.y = block.t;
            this.v = 0;
        }


        
        // ctx.fillRect(this.position.x, this.position.y, 50, 50);
        // ctx.drawImage(mech, 0, 0, mech.width, mech.height, this.position.x, this.position.y, 50, 50);
        ctx.drawSprite(mech, this.position, this.size, 0, this.registration);
    }
}