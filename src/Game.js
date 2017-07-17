// @flow

import Point from 'Point'

// let debugTextDiv;

import Bullet from 'Bullet';
import Engine from 'Engine';
import Keyboard from 'Keyboard';
import Missile from 'Missile';
import Mouse from 'Mouse';
import Player from 'Player';
import Shell from 'Shell';
import Context from 'Context';

export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){
        let canvas = document.createElement('CANVAS');
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        // debugTextDiv = document.createElement('div');
        // document.body.appendChild(debugTextDiv)
        // debugTextDiv.innerHTML = "debug"
        
        this.ctx = canvas.getContext('2d');
        // this.ctx = new Context(canvas.getContext('2d'))

        this.ctx.drawSprite = function(image, position = {x:0, y:0}, size = {w:20,h:20}, rotation = 0, registration = {x:.5,y:.5}){
            // console.log(this);
            this.translate(position.x, position.y);
            this.rotate(rotation);
            let imageParams = [image, 0, 0, image.width, image.height]
            this.drawImage(...imageParams, 
                -size.w*registration.x, 
                -size.h*registration.y, 
                size.w, size.h)
            this.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate
        } 
        // this.ctx.fillRect(10, 10, 40, 40);

        // this.shells = [];
        // this.bullets = [];

        let player = new Player({position: new Point({x: 50, y: 200})})

        let engine = new Engine({ctx:this.ctx});
        let firing = false;
        // engine.register({
        //     update: ({ctx, mouse}) => {
                
        //         // console.log('update');
        //         if(firing){
        //             engine.register(new Shell({
        //                 x: player.position.x,
        //                 y: player.position.y,
        //                 h: Math.random()-0.5,
        //                 v: -Math.random()
        //             }))
        //             let diff = mouse.position.subtract(player.position);
        //             let dir = Math.atan2(diff.y, diff.x)
        //             dir += (Math.random()-0.5)/10 //spread
        //             engine.register(new Bullet({
        //                 x: player.position.x,
        //                 y: player.position.y,
        //                 // h: 10+Math.random(),
        //                 // v: (Math.random()-0.5)/3
        //                 h:Math.cos(dir)*10,
        //                 v:Math.sin(dir)*10
        //             }))

        //         }
                
        //     }
        // })
        engine.register(player);
        


        engine.update();  //starts
    }
}
