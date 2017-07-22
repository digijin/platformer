//@flow

import type Engine from 'Engine'
import type Point from 'Point'

export default class Enemy{
    position:Point;
    constructor(params:Object){
        Object.assign(this, params);
    }1
    update(engine:Engine){

    }
}

export function* ai(a):Generator<*,*,*>{
    let b = yield a;
    let c = yield b;
    return c;
    return "d";//unreachable

}