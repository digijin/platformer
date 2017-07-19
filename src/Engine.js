//@flow
import Keyboard from 'Keyboard';
import Missile from 'Missile';
import Mouse from 'Mouse';
import State from 'State';

import type SceneBase from 'Scene/Base'
import type Context from 'Context';
import type UI from 'UI';

export default class Engine{
    objects:Array<Object>;
    ctx:Context
    lastTime: number;
    mouse:Mouse;
    keyboard:Keyboard
    deltaTime: number;
    state:State
    currentScene: SceneBase
    ui:UI

    //init
    constructor(params:{ctx:Context, ui:UI}){
        
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.ctx = params.ctx;
        this.ui = params.ui;
        this.objects = []
        this.lastTime = new Date().getTime();
        this.state = new State();
    }

    startScene(scene:SceneBase){
        if(this.currentScene)
            this.currentScene.end();
        this.currentScene = scene;
        this.currentScene.start(this);
    }

    //add new objects to be tracked by engine
    register = (obj:Object) => {
        obj.destroy = () => {
            let i = this.objects.indexOf(obj);
            if(i>-1){
                this.objects.splice(i, 1);
            }
        }
        if(obj.init)obj.init(this);
        this.objects.push(obj)
    }

    //main game loop
    update = () => {
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
