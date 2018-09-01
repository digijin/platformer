
import Base from "./Base";
import PlayerState from "Level/Actor/Player/State";


export default class Slam extends Base{

    states = [PlayerState.AIRBORNE]
    update(){
    	if (this.engine.input.getButtonDown("down")) {
    		this.player.v = 40;
    		this.player.h = 0;
    		this.player.changeState(PlayerState.SLAM);
    	}
    }
}