
import Base from "./Base";
import PlayerState, { ALL } from "Level/Actor/Player/State";
import config from "config";
import Shell from "GameObject/Shell";


export default class MoveVertical extends Base{

    states = ALL
    update(){
    	let hDelta = this.h * this.engine.deltaTime * 500;//legs.speed;
    	if (!this.player.canMoveHori(hDelta)) {
    		if (this.player.canStep(hDelta)) {
    			//step up and keep going
    			this.player.position.y -= config.grid.width;
    		} else {
    			this.player.h = 0;
    			hDelta = 0;
    		}
    	}
    }

}