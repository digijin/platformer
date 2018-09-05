//@flow

// import type Engine from "Engine";
import type Point from "Utility/Point";
import type Actor from "Level/Actor";
import type Decor from "Level/Grid/Decor";
import GameObject from "GameObject";
import Line from "Utility/Line";

export default class Projectile extends GameObject {
    direction: number;
    h: number;
    target: Point;
    owner: Actor;
    speed: number;
    guided: boolean;
    trajectory: Line;
    position: Point;
    v: number;
    constructor(params: {
        position: Point,
        direction: number,
        target: Point,
        owner: Actor
    }) {
    	super();

    	Object.assign(this, params);
    }

    explode() {
    	//wait til after render
    	setTimeout(() => {
    		this.destroy();
    	}, 0);
    }

    move() {
    	const old = this.position.clone();
    	this.position.x += this.h * this.engine.deltaTime * this.speed;
    	this.position.y += this.v * this.engine.deltaTime * this.speed;
    	this.trajectory = new Line({ a: old, b: this.position });
    }
    // checkEnemy() {
    // 	this.engine.objectsTagged("actor").forEach((o: GameObject) => {
    // 		if (o !== this.owner) {
    // 			let a: Actor = ((o: any): Actor); RECAST
    // 			if (a.getBoundingRect().contains(this.position)) {
    // 				this.explode();
    // 			  this.destroy();
    // 				a.damage(2);
    // 			}
    // 		}
    // 	});
    // }

    checkGrid() {
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
    				this.position.x = hitTest.collision.x;
    				this.position.y = hitTest.collision.y;
    				block.damage(1);
    				return false;
    			}
    		}
    	});
    	if (!empty) {
    		this.explode();
    	}
    }

    checkDecor(onHit: (decor: Decor, hitTest: {}) => {}) {
    	const missDecor = this.engine.grid.decor.every(d => {
    		if (d.getType().obstacle == false) {
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
