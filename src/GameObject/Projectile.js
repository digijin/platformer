//@flow

// import type Engine from "Engine";
import Point from "Utility/Point";
import type Actor from "Level/Actor";
import type Decor from "Level/Grid/Decor";
import GameObject from "GameObject";
import Line from "Utility/Line";

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
    	// console.log(params.position.constructor.name);
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
    // checkEnemy() {
    // 	this.engine.getActors().forEach((o: GameObject) => {
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
    				// console.log("damage block");
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
