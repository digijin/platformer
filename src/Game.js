// @flow

import Point from 'Point'
import missile from './missile.png'

// let debugTextDiv;


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
        // this.ctx.fillRect(10, 10, 40, 40);

        // this.shells = [];
        // this.bullets = [];

        let player = new Player({position: new Point({x: 50, y: 200})})

        let engine = new Engine({ctx:this.ctx});
        let firing = false;
        engine.register({
            update: ({ctx, mouse}) => {
                
                // console.log('update');
                if(firing){
                    engine.register(new Shell({
                        x: player.position.x,
                        y: player.position.y,
                        h: Math.random()-0.5,
                        v: -Math.random()
                    }))
                    let diff = mouse.position.subtract(player.position);
                    let dir = Math.atan2(diff.y, diff.x)
                    dir += (Math.random()-0.5)/10 //spread
                    engine.register(new Bullet({
                        x: player.position.x,
                        y: player.position.y,
                        // h: 10+Math.random(),
                        // v: (Math.random()-0.5)/3
                        h:Math.cos(dir)*10,
                        v:Math.sin(dir)*10
                    }))

                }
                
            }
        })
        engine.register(player);
        document.addEventListener("mousedown", (e) => {
            switch(e.button){
                case 0:
                    firing = true;
                break;
                case 2: 
                    engine.register(new Missile({
                        direction: -Math.PI/2,
                        speed: 3,
                        position: player.position.clone(),
                        target: new Point({x:e.clientX, y: e.clientY})
                    }));
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


        engine.update();  //starts
    }
}
