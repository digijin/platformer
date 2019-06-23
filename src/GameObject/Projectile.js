// @flow

// import type Engine from "Engine";
import Point from "Utility/Point";
import type Actor from "Level/Actor";
import type Decor from "Level/Grid/Decor";
import GameObject from "GameObject";
import Line from "Utility/Line";
import Globals from "../Globals";

export default class Projectile extends GameObject {
    h: number;
    position: Point;
    target: Point;
    owner: Actor;
    speed: number;
    guided: boolean;
    trajectory: Line;
    direction: number;
    v: number;
    constructor(params: {
        position: Point,
        direction: number,
        target: Point,
        owner: Actor
    }) {
    	super();
    	Globals.get("player", (player) => {this.player = player;});
    	Object.assign(this, params);
		
    }

    explode() {
    	//wait til after render
    	setTimeout(() => {
    		this.destroy();
    	}, 0);
    }

    move() {
    	const old = new Point(this.position);
    	this.position.x += this.h * this.engine.deltaTime * this.speed;
    	this.position.y += this.v * this.engine.deltaTime * this.speed;
    	this.trajectory = new Line({ a: old, b: this.position });
    }

    ifHitsEnemyThen(doThis: (actor: Actor) => {}) {
    	//using every so a missile doesnt blow up twice

    	this.engine.manager.getEnemies().every( en => {
    		if(en !== this.owner){
    			if (this.cheapCheck(en) || this.expensiveCheck(en)) {
    				doThis(en);
    				return false;
    			}
    		}
    		return true;
    	});
    }

    ifHitsPlayerThen(doThis: (actor: Actor) => {}) {
    	const player = this.engine.manager.player;
    	if (this.cheapCheck(player) || this.expensiveCheck(player)) {
    		doThis(player);
    	}

    }

    cheapCheck(actor: Actor) {
    	return actor.getBoundingRect().contains(this.position);
    }

    expensiveCheck(actor: Actor) {
    	return this.trajectory.intersectsRect(actor.getBoundingRect()).result;
    }

    ifHitsGridThen(onHit: (block: Block, hitTest: {})=>{}) {
    	const blocks = this.trajectory.blockPixels();
    	const empty = blocks.every(b => {
    		const block = this.engine.grid.getBlock(b);
    		if (!block) {
    			return false;
    		}
    		if (block.isVacant()) {
    			return true;
    		} else {
    			const hitTest = this.trajectory.intersectsRect(block.rect);
    			if (hitTest.result && hitTest.collision) {
    				// this.position.x = hitTest.collision.x;
    				// this.position.y = hitTest.collision.y;
    				// // console.log("damage block");
    				// block.damage(1);
    				onHit(block, hitTest);
    				return false;
    			}
    		}
    	});
    	if (!empty) {
    		this.explode();
    	}
    }

    ifHitsDecorThen(onHit: (decor: Decor, hitTest: {}) => {}) {
    	const missDecor = this.engine.grid.decor.every(d => {
    		if (d.getType().obstacle === false) {
    			return true;
    		}
    		const hitTest = this.trajectory.intersectsRect(d.rect);
    		if (hitTest.result && hitTest.collision) {
    			onHit(d, hitTest);
    			return false;
    		} else {
    			return true;
    		}
    	});
    	if (!missDecor) {
    		this.explode();
    	}
    }
}
