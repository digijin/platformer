// @flow

import Point from 'Point'

let debugTextDiv;


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
}

export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){
        let canvas = document.createElement('CANVAS');
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        debugTextDiv = document.createElement('div');
        document.body.appendChild(debugTextDiv)
        debugTextDiv.innerHTML = "debug"
        
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
export class Engine{
    objects:Array<Object>;
    ctx:Object
    lastTime: number;
    mouse:Mouse
    constructor({ctx}){
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.ctx = ctx
        this.objects = []
        this.lastTime = new Date().getTime();
    }
    register = (obj:Object) => {
        obj.destroy = () => {
            let i = this.objects.indexOf(obj);
            if(i>-1){
                this.objects.splice(i, 1);
            }
        }
        this.objects.push(obj)
    }
    update = () => {
        let nowTime = new Date().getTime();
        let diff = nowTime - this.lastTime;
        this.lastTime = nowTime;

        
        this.ctx.clearRect(0,0,500, 500)

        this.objects.forEach(o => {o.update({
            ctx:this.ctx, 
            deltaTime:diff/1000,
            mouse:this.mouse,
            keyboard:this.keyboard
        })});

        requestAnimationFrame(this.update)
    }
}

export class Mouse{
    position: Point;
    constructor(){
        this.position = new Point({x:0, y:0})
        document.addEventListener('mousemove', (e) => {
            // console.log('e', e);
            this.position = new Point({x:e.clientX, y: e.clientY});
        })
    }
    update(){

    }
}

export class Keyboard{
    keysdown: Array<number>;
    constructor(){
        this.keysdown = []
        window.onkeydown = (e) => {
            // console.log('down', e.keyCode);
            //strip duplicates
            if(!this.down(e.keyCode)){
                this.keysdown.push(e.keyCode);
            }
        }
        window.onkeyup = (e) => {
            this.keysdown.splice(this.keysdown.indexOf(e.keyCode), 1);
        }
    }
    down = (key) => {
        return this.keysdown.indexOf(key)>-1;
    }
}

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
        if(this.y>250 && this.v>0){
            this.v = -this.v
        }
        if(this.time < 0){
            this.destroy();
        }
    }
}
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

export class Missile{
    position:Point;
    direction: number;
    target:Point;
    speed: number
    constructor(params:{position:Point, direction: number, target:Point}){
        Object.assign(this, params);
        this.speed = 1;
        this.guided = true;
    }
    explode(){
        this.destroy();
    }
    update = ({ctx, deltaTime, mouse}) => {
        // console.log('"asd');

        this.position.y += Math.sin(this.direction)*this.speed;
        this.position.x += Math.cos(this.direction)*this.speed;

        //aim at target
        // this.target = mouse.position
        if(this.guided){
            let diff = this.target.subtract(this.position);
            let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
            if(dist < 20){
                this.explode();
            }
            let newdir = Math.atan2(diff.y, diff.x);

            // debugTextDiv.innerHTML = 'current: '+this.direction+"<br />target: "+newdir

            let dirDiff = this.direction - newdir;
            if(dirDiff > Math.PI) 
                newdir += 2*Math.PI
            if(dirDiff < -Math.PI) 
                newdir -= 2*Math.PI

            // if(Math.abs(newdir - this.direction)>Math.PI) debugger;

            let n = 5
            dirDiff = (newdir - this.direction)
            // console.log('dd', dirDiff);
            // this.speed = 2 - dirDiff
            
            // this.direction += dirDiff * deltaTime
            if(Math.abs(dirDiff) < 0.5){
                this.speed += deltaTime*8;
                this.direction += dirDiff/3
            }else{
                this.speed -= deltaTime*5;
                // this.speed = (this.speed + 1) /2;
                if(dirDiff > 0){
                    this.direction += deltaTime *Math.PI
                }else{
                    this.direction -= deltaTime *Math.PI
                }
            }
            if(this.speed<1)this.speed = 1;
            if(this.speed>8)this.speed = 8;

            //dont spin it up too much
            // if(Math.abs(this.direction>Math.PI*2)){
            //     this.direction = this.direction % (Math.PI/2);
            // }
            if(this.direction>Math.PI) this.direction -= Math.PI*2
            if(this.direction<-Math.PI) this.direction += Math.PI*2

        }




        

        ctx.fillRect(this.position.x, this.position.y, 10, 10);
    }
}