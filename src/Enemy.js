//@flow

import type Engine from 'Engine'
import type Point from 'Point'

import mech from 'mech.png'

export default class Enemy{
    position:Point;
    size: {w:number, h:number};
    registration: {x:number, y:number}
    constructor(params:Object){
        this.size = {w:50, h:50};
        this.registration = {x:0.5, y:1}

        Object.assign(this, params);
    }
    update(engine:Engine){

        engine.ctx.drawSprite(mech, this.position, this.size, 0, this.registration)

    }
}

// export function* ai(a):Generator<*,*,*>{
//     let b = yield a;
//     let c = yield b;
//     return c;
//     return "d";//unreachable

// }