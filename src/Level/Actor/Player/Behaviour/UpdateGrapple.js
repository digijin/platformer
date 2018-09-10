
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";

import { HAND_STATE } from "../../Player";

export default class UpdateGrapple extends Base{

    states = ALL
    update(){
    	if (this.player.hand.state == HAND_STATE.ARMED) {
    		this.player.hand.position = this.player.position.add(this.player.hand.offset);
    	}
    	if (this.engine.input.getButtonDown("grapple")) {
    		//FIRE HAND
    		if (this.player.hand.state == HAND_STATE.ARMED) {
    			this.player.hand.state = HAND_STATE.FIRED;
    			const diff = this.player.getTargetPoint().subtract(this.player.hand.position);
    			const dir = Math.atan2(diff.y, diff.x);
    			this.player.hand.direction = dir;
    		}
    	} else {
    		// if (this.player.hand.state == HAND_STATE.GRIPPED) {
    		// 	this.player.hand.state = HAND_STATE.RELEASED;
    		// }
    	}
    	if (this.player.hand.state == HAND_STATE.FIRED) {
    		this.player.hand.position.x +=
				Math.cos(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		this.player.hand.position.y +=
				Math.sin(this.player.hand.direction) * this.engine.deltaTime * this.player.hand.speed;
    		if (this.player.position.distanceTo(this.player.hand.position) > this.player.hand.distance) {
    			this.player.hand.state = HAND_STATE.RELEASED;
    		}
    		if (this.engine.grid.isPositionBlocked(this.player.hand.position)) {
    			// if(grid.blockAtPosition(this.player.hand.position).block !== "0"){
    			this.player.hand.state = HAND_STATE.GRIPPED;
    		}
    	}
    	if (this.player.hand.state == HAND_STATE.RELEASED) {
    		const target = this.player.position.add(this.player.hand.offset);
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
    	if(this.player.hand.state == HAND_STATE.GRIPPED){
    		const spaceLeft = this.player.position.subtract(this.player.hand.position).length();
    		// console.log(spaceLeft);
    		if(spaceLeft < 100){
    			this.player.hand.state = HAND_STATE.RELEASED;
    		}
    	}
		
    	// console.log("hand state", this.player.hand.state);
    }

}