//@flow

import type Engine from "Engine";
/**
 * Base class for anything registered by the engine
 */
export default class GameObject {
    tags: Array<string>;
    engine: Engine;
    z: number; //ordering
    tag = (tag: string) => {
    	this.tags.push(tag);
    };

    hasTag = (tag: string) => {
    	return this.tags.indexOf(tag) > -1;
    };

    constructor() {
    	this.tags = [];
    }

    init(engine: Engine) {
    	this.engine = engine;
    }

    //called on every object as it is unloaded so it can clean up
    exit() {}
    update() {}
    destroy() {
    	this.engine.destroy(this);
    }
}
