import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

import { HAND_STATE } from "../../Player";
import Point from "Utility/Point";
import Line from "../../../../Utility/Line";

export default class UpdateGrapple extends Base{

    states = ALL
    update(){
    	if (this.player.hand.state === HAND_STATE.ARMED) {
    		this.player.hand.position = new Point(this.player.position).add(this.player.hand.offset);
    	}
    	if (this.engine.input.getButtonDown("grapple")) {
    		//FIRE HAND
    		if (this.player.hand.state === HAND_STATE.ARMED) {
    			this.player.hand.state = HAND_STATE.FIRED;
    			const diff = this.player.getTargetPoint().subtract(this.player.hand.position);
    			this.player.hand.direction = Math.atan2(diff.y, diff.x);
    		}
    	} else {
    		// if (this.player.hand.state == HAND_STATE.GRIPPED) {
    		// 	this.player.hand.state = HAND_STATE.RELEASED;
    		// }
    	}
    	if (this.player.hand.state === HAND_STATE.FIRED) {
    		const old = new Point(this.player.hand.position);
    		this.player.hand.position.x +=
				Math.cos(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		this.player.hand.position.y +=
				Math.sin(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		const curr = new Point(this.player.hand.position);
    		if (curr.distanceTo(this.player.hand.position) > this.player.hand.distance) {
    			this.player.hand.state = HAND_STATE.RELEASED;
    		}
    		//todo unify this with projectile.js, maybe make grapple a projectile
    		const trajectory = new Line({ a: old, b: curr });
    		const blocks = trajectory.blockPixels();
    		// console.log(blocks.length, "blocks");
    		const empty = blocks.every(b => {
    			const block = this.engine.grid.getBlock(b);
    			if (!block) {
    				return false;
    			}
    			if (block.isVacant() && !block.isPlatform()) {
    				return true;
    			} else {
    				const hitTest = trajectory.intersectsRect(block.rect);
    				if (hitTest.result && hitTest.collision) {
    					this.player.hand.position.y = hitTest.collision.y;
    					this.player.hand.position.x = hitTest.collision.x;
    					// console.log("damage block");
    					// block.damage(1);
    					return false;
    				}
    			}
    		});
    		if (!empty) {
    			this.player.hand.state = HAND_STATE.GRIPPED;
    		}

    		// if (this.engine.grid.isPositionBlocked(this.player.hand.position)) {
    		// 	// if(grid.blockAtPosition(this.player.hand.position).block !== "0"){
    		// 	this.player.hand.state = HAND_STATE.GRIPPED;
    		// }
    	}
    	if (this.player.hand.state === HAND_STATE.RELEASED) {
    		const target = new Point(this.player.position).add(this.player.hand.offset);
    		const diff = target.subtract(this.player.hand.position);
    		const dist = this.player.hand.position.distanceTo(target);
    		const speed = this.engine.deltaTime * this.player.hand.speed;
    		if (speed > dist) {
    			this.player.hand.position = target;
    			this.player.hand.state = HAND_STATE.ARMED;
    		} else {
    			const dir = Math.atan2(diff.y, diff.x);
    			this.player.hand.position.x += Math.cos(dir) * speed;
    			this.player.hand.position.y += Math.sin(dir) * speed;
    		}
    	}
    	if(this.player.hand.state === HAND_STATE.GRIPPED){
    		const spaceLeft = new Point(this.player.position).subtract(this.player.hand.position).length();
    		// console.log(spaceLeft);
    		if(spaceLeft < 100){
    			this.player.hand.state = HAND_STATE.RELEASED;
    		}
    	}

    	// console.log("hand state", this.player.hand.state);
    }

}