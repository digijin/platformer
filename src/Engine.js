
import Keyboard from 'Keyboard';
import Missile from 'Missile';
import Mouse from 'Mouse';
import State from 'State';

export default class Engine{
    objects:Array<Object>;
    ctx:Object
    lastTime: number;
    mouse:Mouse;
    deltaTime: number;
    state:State

    //init
    constructor({ctx}){
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.ctx = ctx;
        this.objects = []
        this.lastTime = new Date().getTime();
        this.state = new State();
    }

    //add new objects to be tracked by engine
    register = (obj:Object) => {
        obj.destroy = () => {
            let i = this.objects.indexOf(obj);
            if(i>-1){
                this.objects.splice(i, 1);
            }
        }
        this.objects.push(obj)
    }

    //main game loop
    update = () => {
        // console.log(this.objects.length);
        
        //handle time
        let nowTime = new Date().getTime();
        let diff = nowTime - this.lastTime;
        this.lastTime = nowTime;
        this.deltaTime = diff/1000

        //clear canvas
        this.ctx.clearRect(0,0,500, 500)

        //update all object
        this.objects.forEach(o => {o.update(this)});

        //wait for next frame
        requestAnimationFrame(this.update)
    }
}
