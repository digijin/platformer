// @flow
import GameObject from "GameObject";
import Renderable from "GameObject/Renderable";
import Point from "Utility/Point";

import config from "config";

import Rect from "Utility/Rect";
// import type Engine from "Engine";
import Explosion from "GameObject/Explosion";
import type Block from "Grid/Block";
// let engine: Engine;

export default class Actor extends Renderable {
    v: number;

    explode = () => {
    	this.destroy();
    	//fill rect with explosions
    	let rect: Rect = this.getBoundingRect();
    	let center: Point = rect.centerPoint();
    	//find random points
    	for (let i = 0; i < 20; i++) {
    		let point: Point = new Point({
    			x: rect.l + rect.width() * Math.random(),
    			y: rect.t + rect.height() * Math.random()
    		});
    		//direction from center
    		let diff = point.subtract(center);
    		let dir = Math.atan2(diff.y, diff.x);

    		this.engine.register(
    			new Explosion({
    				position: point,
    				rotation: dir,
    				delay: Math.random() / 8
    			})
    		);
    	}
    };

    z: number;
    hp: number;
    maxhp: number;
    canMoveVert = (amount: number): boolean => {
    	let boundingRect = this.getBoundingRect();
    	let targetRect = boundingRect.move({ x: 0, y: amount });
    	let blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
    	let obstacles = blocks.filter(block => {
    		return !block.isEmpty();
    	});
    	return obstacles.length == 0;
    };

    canMoveHori = (amount: number): boolean => {
    	let boundingRect = this.getBoundingRect();
    	let targetRect = boundingRect.move({ x: amount, y: 0 });
    	let blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
    	let obstacles = blocks.filter(block => {
    		return !block.isEmpty();
    	});
    	return obstacles.length == 0;
    };

    h: number;

    getBoundingRect = (): Rect => {
    	return Rect.fromPosSizeRego(
    		this.position,
    		this.size,
    		this.registration
    	);
    };

    gravity = () => {
    	this.v += this.engine.deltaTime * config.gravity; //GRAVITY
    	if (!this.canMoveVert(this.v)) {
    		if (this.v < 0) {
    			//heading upwards
    			this.v = 0.1;
    		} else {
    			//landed
    			this.v = 0;
    		}
    	}
    	this.position.y += this.v;
    };

    //whether actor can step up
    canStep = (amount: number): boolean => {
    	let boundingRect = this.getBoundingRect();
    	let targetRect = boundingRect.move({ x: amount, y: 0 });
    	let blocks = this.engine.grid.getBlocksOverlappingRect(targetRect);
    	let obstacles = blocks.filter(block => {
    		return !block.isEmpty();
    	});
    	//if only one block is an obstacle, and it is in lower corner
    	let step: ?Block;
    	if (obstacles.length == 1) {
    		if (amount > 0) {
    			//moving right
    			if (!blocks[blocks.length - 1].isEmpty()) {
    				step = blocks[blocks.length - 1];
    			}
    		} else {
    			let bl = blocks.reduce((a: Block, b: Block) => {
    				if (a.position.x < b.position.x) {
    					//more left
    					return a;
    				}
    				if (a.position.y > b.position.y) {
    					//lower
    					return a;
    				}
    				return b;
    			});
    			if (!bl.isEmpty()) {
    				step = bl;
    			}
    		}
    	}
    	if (step) {
    		return this.canMoveVert(-config.grid.width);
    	}
    	return false;
    };

    constructor(params: {}) {
    	super();
    	this.v = 0;
    	this.h = 0;
    	this.hp = 1;
    	this.maxhp = 1;
    	Object.assign(this, params);

    	this.tag("actor");
    }

    setAgro(actor: Actor) {
    	this.agro = actor;
    }

    damage(amount: number) {
    	this.hp -= amount;
    	if (this.hp <= 0) {
    		this.explode();
    	}
    }
}
