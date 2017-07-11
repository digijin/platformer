// @flow
export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){
        let canvas = document.createElement('CANVAS');
        container.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        this.ctx.fillRect(10, 10, 40, 40);

        this.shells = [];
        this.bullets = [];

        let engine = new Engine({ctx:this.ctx});
        engine.register({
            update: ({ctx}) => {
                ctx.clearRect(0,0,300,150);
                console.log('update');
                
                engine.register(new Shell({
                    x: 50,
                    y: 50,
                    h: Math.random()-0.5,
                    v: -Math.random()
                }))
                engine.register(new Bullet({
                    x: 50,
                    y: 50,
                    h: 10+Math.random(),
                    v: (Math.random()-0.5)/3
                }))
            }
        })
        engine.update();  //starts
    }
}
export class Engine{
    objects:Array<Object>;
    ctx:Object
    lastTime: number;
    constructor({ctx}){
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

        this.objects.forEach(o => {o.update({
            ctx:this.ctx, 
            deltaTime:diff/1000
        })});

        requestAnimationFrame(this.update)
    }
}

export class Shell{
    x:number;//position
    y:number;//position
    h:number;//momentum
    v:number;//momentum
    constructor(params){
        Object.assign(this, params);
    }
    update({ctx}){
        this.x += this.h;
        this.y += this.v;
        this.v += 0.01;
        ctx.fillRect(this.x, this.y, 4, 4);
        if(this.y > 130){
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
    }
    update = ({ctx}) => {
        this.x += this.h;
        this.y += this.v;
        // shell.v += 0.01;
        ctx.fillRect(this.x, this.y, 4, 4);
        if(this.x > 250){
            this.destroy();
        }
    }
}