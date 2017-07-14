
import Keyboard from 'Keyboard';
import Missile from 'Missile';
import Mouse from 'Mouse';

export default class Engine{
    objects:Array<Object>;
    ctx:Object
    lastTime: number;
    mouse:Mouse;
    deltaTime: number;
    constructor({ctx}){
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.ctx = ctx;
        this.objects = []
        this.lastTime = new Date().getTime();
    }
    register = (obj:Object) => {
        // if(!this)debugger;
        obj.destroy = () => {
            let i = this.objects.indexOf(obj);
            if(i>-1){
                this.objects.splice(i, 1);
            }
        }
        this.objects.push(obj)
        // console.log(this.objects.length)
    }
    update = () => {
        let nowTime = new Date().getTime();
        let diff = nowTime - this.lastTime;
        this.lastTime = nowTime;

        this.deltaTime = diff/1000
        this.ctx.clearRect(0,0,500, 500)

        this.objects.forEach(o => {o.update(
        // {
        //     ctx:this.ctx, 
        //     deltaTime:diff/1000,
        //     mouse:this.mouse,
        //     keyboard:this.keyboard
        // }
        this
        )});

        requestAnimationFrame(this.update)
    }
}
