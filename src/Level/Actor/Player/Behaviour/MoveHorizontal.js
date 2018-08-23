
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";
import config from "config";

import { HAND_STATE } from "../../Player";


export default class MoveHorizontal extends Base{

    states = ALL
    update(){
    	let hDelta = this.player.h * this.engine.deltaTime * 500;//legs.speed;
        
    	if (this.player.hand.state == HAND_STATE.GRIPPED) {
    		// console.log("yoloswag");
    		//REEL IN
    		const diff = this.player.position.add(this.player.hand.offset).subtract(this.player.hand.position);
    		const dir = Math.atan2(diff.y, diff.x);
    		this.player.h = -Math.cos(dir); //* deltaTime*hSpeed
    		this.player.v = -Math.sin(dir) * this.engine.deltaTime * this.player.hand.reelSpeed;
    		hDelta = this.player.h * this.engine.deltaTime * this.player.hand.reelSpeed;
    	}
        
    	if (!this.player.canMoveHori(hDelta)) {
    		if (this.player.canStep(hDelta)) {
    			//step up and keep going
    			this.player.position.y -= config.grid.width;
    		} else {
    			this.player.h = 0;
    			hDelta = 0;
    		}
    	}
    	this.player.position.x += hDelta;
    }

}