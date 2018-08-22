
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";


export default class Jump extends Base{

    states = [PlayerState.AIRBORNE]
    update(){
    	if(this.engine.input.getButtonDown("jump")){
    		this.player.v = -10;
    		this.player.changeState(PlayerState.AIRBORNE);
    	}
    }
}