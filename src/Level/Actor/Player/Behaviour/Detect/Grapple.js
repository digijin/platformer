import Base from "../Base";
import PlayerState from "Level/Actor/Player/State";
import { ALL } from "Level/Actor/Player/State";


export default class DetectGrapple extends Base{

    states = ALL;
    
    update(){
    	if (this.engine.input.getButtonDown("grapple")) {
    		this.player.changeState(PlayerState.GRAPPLE);
    	}
    }
}