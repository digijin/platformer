// @flow
import Base from "./Base";
import { AllExcept } from "Level/Actor/Player/State";
import PlayerState from "Level/Actor/Player/State";
import config from "config";

// import Point from "Utility/Point";
// import { HAND_STATE } from "../../Player";


export default class MoveHorizontal extends Base{

	states = AllExcept(PlayerState.GRAPPLE);
	update(){
    	const gp = this.player.getGamePad();
    	if (gp && this.engine.input.getLastActivityDevice() == "gamepad") {
    		this.h = gp.axes[0];
    	}
    	if (this.engine.input.getButton("stand")) {
    		this.h = 0;
    	}

    	let hDelta = this.player.h * this.engine.deltaTime * 500;//legs.speed;
        
        
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